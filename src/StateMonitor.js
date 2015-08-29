function filterArgs(args) {
    let result = args
    try {
        JSON.stringify(args)
    } catch(e) {
        result = args.map(arg =>
            (typeof arg === 'function' || typeof arg === 'object')
                ? '[circular]'
                : arg
        )
    }

    return result
}

export default function StateMonitor({cursor, historyPath}) {
    const historyCursor = cursor.select([historyPath])
    historyCursor.set([])

    return function stateMonitor({displayName, id}, args) {
        const prevState = cursor.snap()

        return function stop() {
            const diff = cursor.diff(prevState, [historyPath])
            historyCursor.apply(h => h.concat([
                {
                    displayName,
                    id,
                    args: filterArgs(args),
                    diff
                }
            ]))
        }
    }
}
