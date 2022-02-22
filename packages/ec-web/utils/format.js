/**
 * Display the number with 2 digits
 * @param {string | number} number 
 * @returns 
 */
import { API_URL } from "./urls";
export const TwoDecimals = (number) => parseFloat(number).toFixed(2);

export const SeperatePrice = (number) => number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const takeUsernameFromEmail = (string) => {
    const email = string;
    var username = '';
    for(var i of email) {
        if (i != '@') {
            username += i
        }
        else {
            break;
        }
    }
    return username
}

export const calculateDueDate = (createdAt, timeFinishUnit, timeFinish) => {
    //Not implement done, still bug
    var hourOfUnit = 1;
    switch(timeFinishUnit) {
        case "Hours":
            hourOfUnit = 1;
            break;
        case "Days":
            hourOfUnit = 24;
            break;
        case "Weeks": 
            hourOfUnit = 24*7;
            break;
        case "Months": 
            hourOfUnit = 24*31;
            break;
        case "Years": 
            hourOfUnit = 24*31*12;
            break;
        default:
            break;

    }
    var dateCreate = Date.parse(createdAt); // We get milseconds
    // Due date would be dateCreate + 3 day + (timeFinishUnit * timeFinish) -> miliseconds
    var expireDate = dateCreate + (3 * 24 * 3600000) + (Number(timeFinish) * hourOfUnit) * 3600000;
    expireDate = new Date(expireDate)
    var result = expireDate
    return result
}