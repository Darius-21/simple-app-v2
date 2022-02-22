import React from 'react'
import { calculateDueDate } from '../utils/format';

export default function test() {
    //Now our task is to from the current date and time, get its milisecond
    var today = new Date();
    console.log(calculateDueDate(today, "Hous", 7))
    return (
        <div>
            
        </div>
    )
}
