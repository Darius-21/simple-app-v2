import React from 'react'
import { Small, Submit } from '../Button/index.stories'


export default function JobOffer({action,method,name}) {
    return (
        <div className='job-offer box'>
            <form name={name} action={action} method={method} className='job-offer'>
                <div className='box-title'>
                    <h1>JOB OFFER</h1>
                </div>
                <ul className='job-offer'>
                    <li>
                        <label for = 'job-name'>Job Name</label>
                        <input type = 'text' id = 'job-name'></input>
                    </li>
                    <li>
                        <label for = 'job-wage'>Job Wage</label>
                        <input type = 'number' id = 'job-wage'></input>
                    </li>
                    <li>
                        <label for = 'job-bonus'>Job Bonus</label>
                        <input type = 'text' id = 'job-bonus'></input>
                    </li>
                    <li>
                        <label id = 'lbljob-des' for = 'job-des'>Job Description</label>
                        <textarea id = 'job-des' rows = '4' cols='30'></textarea>
                    </li>
                    <li className='submitbtn'>
                        <Submit size='large' label='Submit' backgroundColor='#CCAAFF'></Submit>
                    </li>
                </ul>
            </form>
        </div>
    )
}
