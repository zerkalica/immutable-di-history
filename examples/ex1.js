import MonitorFactory from '../src'
import NativeHistoryCursor from '../src/cursors/NativeHistoryCursor'
import Container from 'immutable-di'
import {Factory, Setter} from 'immutable-di/define'

Factory.extend = MonitorFactory

const state = {
  tis: {
    a: 1,
    b: 2
  }
}

const cursor = new NativeHistoryCursor(state)
const container = new Container(cursor)

function Monitor({history}) {
  console.log(JSON.stringify(history, 0, '  '))
}

const MonitorDep = Factory({
  history: ['__history']
})(Monitor)

const action = Factory([
    Setter(['tis', 'a'])
])(function MyAction(setA) {
    return function myAction(value) {
        setA(value)
    }
})

container.mount(MonitorDep)

container.get(action)(123)
