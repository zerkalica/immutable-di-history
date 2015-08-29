import NativeCursor from 'immutable-di/cursors/native'
import Diff from 'modern-diff'
import Patch from 'modern-diff/Patch'
import CompactCodec from 'modern-diff/codecs/CompactCodec'
import NativeAdapter from 'modern-diff/adapters/NativeAdapter'

const diffCompact = Diff({
    adapter: NativeAdapter,
    codec: CompactCodec
})

const patchCompact = Patch({
    adapter: NativeAdapter,
    normalize: CompactCodec.normalize,
    skipTest: true
})

export default class NativeHistoryCursor extends NativeCursor {
    diff(prevState, excludes) {
        const ps = {}
        const state = {}
        Object.keys(prevState).forEach(key => {
            if (excludes.indexOf(key) === -1) {
                ps[key] = prevState[key]
                state[key] = this._state[key]
            }
        })
        return diffCompact(ps, state)
    }

    patch(patches) {
        patchCompact(this._state, patches)
    }
}
