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
