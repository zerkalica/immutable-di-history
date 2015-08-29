# immutable-di history

History diff/patch state support for immutable-di

```js

import MonitorFactory from 'immutable-di-history'
import NativeHistoryCursor from 'immutable-di-history/cursors/NativeHistoryCursor'
import Container from 'immutable-di'
import {Factory} from 'immutable-di/define'

Factory.extend = MonitorFactory

const state = {
  tis: {
    a: 1,
    b: 2
  }
}

const container = new Container(new NativeHistoryCursor(state))


function Monitor({history}) {
  console.log(JSON.stringify(history, 0, '  '))
}

const MonitorDep = Factory({
  history: ['__history']
})(Monitor)

container.mount(MonitorDep)

container.select(['tis', 'a']).set(2) // logs state changes with diff

container.unmount(MonitorDep)

```
