function currentDateTimetoIsoString() {
    let today = new Date();
    let tzo = -today.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
    return today.getFullYear() +
        '-' + pad(today.getMonth() + 1) +
        '-' + pad(today.getDate()) +
        'T' + pad(today.getHours()) +
        ':' + pad(today.getMinutes()) +
        ':' + pad(today.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
}

export { currentDateTimetoIsoString };