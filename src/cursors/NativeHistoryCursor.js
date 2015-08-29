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
    constructor(data) {
        super(data)
    }

    diff(prevState) {
        return diffCompact(prevState, this._data)
    }

    patch(patches) {
        patchCompact(this._data, patches)
    }
}
