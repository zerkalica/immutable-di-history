import Dep from 'immutable-di/utils/Dep'
import StateMonitor from './StateMonitor'
import getFunctionName from 'immutable-di/utils/getFunctionName'

import AbstractCursor from 'immutable-di/cursors/abstract'
import {Factory, Def} from 'immutable-di/define'

const StateMonitorDep = Factory({
    cursor: AbstractCursor,
    historyPath: Def('__history')
})(StateMonitor)

export default function MonitorFactory(origDep) {
    return function monitorFactory(fn) {
        const dep = origDep(fn)
        const def = dep.__di
        const {isAction, displayName, isCachedTemporary} = def

        function monitorResult(depResult: any, stateMonitor: StateMonitor) {
            let result
            if (isAction && typeof depResult === 'function') {
                result = function depWrap(...args) {
                    const stop = stateMonitor(def, args)
                    const resultData = depResult(...args)

                    Promise.resolve(resultData)
                        .then(stop)
                        .catch(stop)

                    return resultData
                }
                result.displayName = (depResult.displayName || getFunctionName(depResult) || displayName) + '_monitorResult'
            } else {
                result = depResult
            }

            return result
        }
        return Dep({
            deps: [dep, StateMonitorDep],
            displayName: displayName + '_monitor',
            isCachedTemporary
        })(monitorResult)
    }
}
