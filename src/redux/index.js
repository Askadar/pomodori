import { toFormattedTime } from '../utils'
const pomoTime = 6;
const restTime = 1;
const initialState = {
    ticking: false,
    paused: false,
    time: 0,
    pomoTime,
    restTime,
    pomoLeft: pomoTime * 1e3,
    restLeft: restTime,
}

export const types = {
    'start': 'TimerStarted@Front',
    'stop': 'TimerStopped@Front',
    'pause': 'TimerPaused@Front',
    'timeUpdated': 'TimerUpdated@Saga',
}
const { start, pause, timeUpdated } = types;

export default (state = initialState, action) => {
    switch (action.type) {
        case timeUpdated:
        const { pomoTime, restTime } = state;
        let pomoLeft = Math.max(pomoTime*1e3  - action.elapsed, 0);
        let restLeft = pomoLeft === 0 ? (restLeft + pomoLeft) * 1e3 - action.elapsed : restLeft * 1e3;
        return {
            ...state,
            time: action.elapsed,
            convertedTime: toFormattedTime(action.elapsed),
            pomoLeft, restLeft,
        };
        default:
        return state
    }
}
