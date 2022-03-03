export const GetIntDateNow = () => new Date().getTime();

export function GetStringDateByTime(date) {
    let dateObj = new Date(date);
    return `${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
} 

export function GetStringDateNow() {
    let date = new Date().getTime();
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
} 