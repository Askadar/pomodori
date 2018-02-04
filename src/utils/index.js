export const toFormattedTime = (timems) => {
    let seconds = timems/1000;
    let minutes = seconds/60;
    let flooredM = Math.floor(minutes);
    let flooredS = Math.floor(seconds);
    return `${('00' + flooredM).slice(-2)}:${('00' + Math.floor(seconds - (flooredM * 60))).slice(-2)}.${('000' + (timems - (flooredS * 1000))).slice(-3)}`
}

export const minutesToFormattedTime = (minutes) => {
    return toFormattedTime(minutes * 1e3);
}

const lsDomain = 'POMO_SETTINGS'

export const loadLocalStorage = (defaults) => {
    const sToMs = time => time*1e3;
    const transferMap = {
        'pomoTime': {
            key: 'pomoLeft',
            value: sToMs,
        },
        'restTime': {
            key: 'restLeft',
            value: sToMs,
        },
    }
    try {
        let settings = JSON.parse(window.localStorage.getItem(lsDomain))
        for (let key in settings){
            if (transferMap[key])
                settings[transferMap[key].key] = transferMap[key].value(settings[key]);
        }
        return { ...defaults, ...settings };
    } catch (e) {
        console.warn(e);
        return defaults
    }
}

export const saveLocalStorage = (settings) => {
    try {
        let stringifiedState = JSON.stringify(settings);
        window.localStorage.setItem(lsDomain, stringifiedState);
    } catch (e) {
        console.warn(e);
        window.localStorage.removeItem(lsDomain);
    }
}
