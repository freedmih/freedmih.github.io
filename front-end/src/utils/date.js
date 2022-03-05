export const GetIntDateNow = () => new Date().getTime();

export function GetStringDateByTime(date) {
    let dateObj = new Date(date);
    return dateObj.toLocaleString();
} 

export function GetStringDateNow() {
    let date = new Date().getTime();
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
} 