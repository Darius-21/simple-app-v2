import Router from 'next/router';
import Link from 'next/link';
import React, {useContext, useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import AuthContext from '../../../context/AuthContext';
import { getSession } from 'next-auth/client';
import JobCard from '../../../components/waitingJobCard';

export default function waitingJobs(props) {

    if(!props.transactionsData || props.transactionsData === undefined) {
        return (
            <div className='container'>
                <div className='title'>Công việc đang chờ xét</div>
                <div className='italic center'>Tik tok tik tok, chấp nhận công việc ngay đi</div>
                <div className='taskContainer'>
                    Hi! we can not find any of your previous data of transactions that are in waiting, pls come back latter.
                </div>
                <style jsx>
                    {`
                    .container{
                        width: 100%;
                    }
                    .taskContainer{
                        margin: 10% auto;
                         text-align: center;
                         font-size: 1.8rem;
                         color: var(--main-color);
                         width: 60%;
                    }
                    `}
                </style>
            </div>
        )
    }
    else {
        return (
            <div className='container'>
                <div className='title'>Công việc đang chờ xét</div>
                <div className='italic center'>Tik tok tik tok, chấp nhận công việc ngay đi</div>
                <div className='taskContainer'>
                    {
                        props.transactionsData.map(trans => (
                            <JobCard trans={trans} session={props.session}/>
                        ))
                    }
                </div>
                <style jsx>
                    {`
                    .taskContainer{
                        margin: 5% auto;
                    }
                    `}
                </style>
            </div>
        )
    }
}

export const getServerSideProps = async({req, res}) => {
    const session = await getSession({ req });
    //We need to return all the transaction that have the job from this seller that status is New 

    const transactionsData = await fetch(`${process.env.API_URL}/transactions?freelancer._id=${session.id}&transactionStatus=New`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session.jwt}`
        }
    })
    const data = await transactionsData.json();

    return {
        props: {
            session, 
            transactionsData: data
        }
    }
    
}