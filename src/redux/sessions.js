import { List } from 'immutable'

export const initialState = {
    list: List([]),
}

export const types = {
    'clearElapsed': 'ElapsedCleared@Front',
    'recorded': 'TimeRecorded@Saga',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.clearElapsed:
            return {
                ...state,
                list: List([])
            }
        case types.recorded:
            return {
                ...state,
                list: state.list.push({
                    time: action.time,
                })
            }
        default:
            return state
    }
}
