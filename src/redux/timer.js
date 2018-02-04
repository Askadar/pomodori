const pomoTime = 6;
const restTime = 1;
export const initialState = {
    ticking: false,
    paused: false,
    time: 0,
    pomoTime,
    restTime,
    pomoLeft: pomoTime * 1e3,
    restLeft: restTime * 1e3,
}

export const types = {
    'start': 'StartTimer@Front',
    'stop': 'StopTimer@Front',
    'pause': 'PauseTimer@Front',
    'resume': 'ResumeTimer@Front',
    'updateSettings': 'UpdateSettings@Front',
    'settingsUpdated': 'SettingsUpdated@Saga',
    'stopped': 'TimerStopped@Saga',
    'timeUpdated': 'TimerUpdated@Saga',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.timeUpdated:
            const { pomoTime, restTime } = state;
            let time = Math.min(action.elapsed, (pomoTime + restTime) * 1e3);
            let pomoLeft = Math.max(pomoTime*1e3  - time, 0);
            let restLeft = pomoLeft === 0 ? (restTime + pomoTime) * 1e3 - time : restTime * 1e3;
            return {
                ...state,
                time,
                // convertedTime: toFormattedTime(action.elapsed),
                pomoLeft, restLeft,
            };
        case types.settingsUpdated:
            return {
                ...state,
                [action.key]: action.value
            }
        case types.start:
        return {...state, ticking: true, paused: false};
        case types.stopped:
        return {...state, ticking: false, paused: false};
        case types.pause:
        return {...state, paused: state.ticking ? true : false};
        case types.resume:
        return {...state, paused: false};
        default:
            return state
    }
}
