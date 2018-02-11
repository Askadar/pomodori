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
        let defaultedSettings = {};
        for (let reducer in defaults) {
            for (let key in settings[reducer]){
                if (transferMap[key])
                    settings[reducer][transferMap[key].key] = transferMap[key].value(settings[reducer][key]);
            }
            defaultedSettings[reducer] = {...defaults[reducer], ...settings[reducer]}
        }
        return defaultedSettings;
    } catch (e) {
        console.warn(e);
        return defaults
    }
}

export const saveLocalStorage = (settings) => {
    const blacklist = [
        'time', 'ticking', 'paused', 'notificationsEnabled'
    ]
    let cleanedSettings = {};
    for (let reducer in settings){
        cleanedSettings[reducer] = {};
        for (let key in settings[reducer]){
            if (!(blacklist.includes(key)))
                cleanedSettings[reducer][key] = settings[reducer][key];
        }
    }
    try {
        let stringifiedState = JSON.stringify(cleanedSettings);
        window.localStorage.setItem(lsDomain, stringifiedState);
    } catch (e) {
        console.warn(e);
        window.localStorage.removeItem(lsDomain);
    }
}
