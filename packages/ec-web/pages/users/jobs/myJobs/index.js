import { Table } from 'react-bootstrap';
import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../../../context/AuthContext';
import HeaderContext from '../../../../context/HeaderContext';
import fetch from 'isomorphic-unfetch'
import parseCookie from 'nookies'
import Link from 'next/link'
import { getSession } from 'next-auth/client'

// Listing things that is needed a table contains datas: 
// name of jobs and its option 
// jobs in this will need to meet the query of having the jwt and have profile.user same as the user_id

export default function myJobs(props) {
    var count = 0;
    return (
        <div className='container'>
            <div className='Freelancer'>
                <div className='title'>Công việc mà bạn đã đăng bán</div>
                <Table striped bordered hover responsive>
                    <thead>
                        <th>#</th>
                        <th>Tên công việc</th>
                        <th>Những option</th>
                        <th>Giá khởi điểm</th>
                    </thead>
                    <tbody>
                        { props.jobsF ? props.jobsF.map(job => (
                            <tr>
                                <td>{++count}</td>
                                <td><Link href={`/users/jobs/myJobs/jobsF/${job._id}`}>{job.name}</Link></td>
                                <td>{job.option.map(option => (
                                    <p>{option.optionName}</p>
                                ))}</td>
                                <td>{job.startingPrice}</td>
                            </tr>
                        )) : ''
                        }
                        <div className='hidden'>{count = 0}</div>
                    </tbody>
                </Table>
            </div>
            <div className='Seeker'>
                <div className='title'>Công việc mà bạn đã đăng tìm người bán</div>
                <Table striped bordered hover responsive>
                    <thead>
                        <th>#</th>
                        <th>Tên công việc</th>
                        <th>Người cần</th>
                        <th>Tiền lương</th>
                    </thead>
                    <tbody>
                        { props.jobsS ? props.jobsS.map(job => (
                            <tr>
                                <td>{++count}</td>
                                <td><Link href={`/users/jobs/myJobs/jobSeek/${job._id}`}>{job.name}</Link></td>
                                <td>{job.numberOfPeople}</td>
                                <td>{job.wage}</td>
                            </tr>
                        )) : ''
                        }
                    </tbody>
                </Table>
                <style jsx>
                    {`
                    .title{
                        margin-bottom: 5%;
                    }
                    .hidden{
                        display: none;
                    }
                    `}
                </style>
            </div>
        </div>
    )
}

export async function getServerSideProps({req, res}) {
    const session = await getSession({req});

    const userId = session.id;
    const jwt = session.jwt;
    const res1 = await fetch(`${process.env.API_URL}/jobs/?profile.user=${userId}`);
    const dataF = await res1.json();


    const res2 = await fetch(`${process.env.API_URL}/job-seekers/?profile.user=${userId}`);
    const dataS = await res2.json();

    return {
        props: {
            jobsF: dataF,
            jobsS: dataS,
            jwt
        }
    }
}