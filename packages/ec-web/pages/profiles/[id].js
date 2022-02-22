import { faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext'
import Head from 'next/head'
import {Row, Col, Button, Card} from 'react-bootstrap'
import { BigJob } from '../../components/JobCard';
import Link from 'next/link'
import { SeperatePrice } from '../../utils/format';
import Router from 'next/router'

export default function ProfileDetails(props) {
    const {profile, fJobs, sJobs} = props;
    
    return (
        <div className='container'>
            <Head>
                <title>{profile.name}</title>
            </Head>
            <Row>
                <Col>
                    <img className='d-block w-100' src={profile.avatar ? `${process.env.API_URL}${profile.avatar.url}` : '/'} alt={profile.name}/>
                </Col>
                <Col style={{textAlign: 'center'}}>
                    <div><div className='inline bold'>Tên:</div> {profile.name}</div>
                    <div><div className='inline bold'>Ngày sinh:</div> {profile.birthday}</div>
                    <div><div className='inline bold'>Số điện thoại:</div> {profile.phone}</div>
                    <div><div className='bold'>Mô tả bản thân:</div> {profile.desc ? profile.desc : "Không có"}</div>
                    <div><div className='inline bold'>Nghề nghiệp:</div> {profile.occupations}</div>
                    <div><div className='bold'>Kỹ năng:</div> {profile.skills}</div>
                    <div><div className='bold'>Bằng cấp / Chứng chỉ:</div> {profile.certificates}</div>
                    <div><div className='inline bold'>Sở thích cá nhân:</div> {profile.interests ? profile.interests : "Không có"}</div>
                </Col>
            </Row>
            <Row>
                <div className='title'>Công việc hiện có</div>
                <div className='card-container'>
                    {
                        fJobs.map(job => (
                            <BigJob job={job}></BigJob>
                        ))
                    }
                </div>
            </Row>
            <Row>
                <div className='title'>Công việc đang tìm người</div>
                <div className='card-container'>
                {
                    sJobs.map(job => (
                        <Link href={`/jobs/seekingJob/${job._id}`}>
                            <Card style={{width: '18rem'}} key={job._id}>
                                <Card.Img variant="top" src={job.coverImage ? process.env.API_URL + job.coverImage.url : ''} alt={job.name} />
                                <Card.Body>
                                    <Card.Title>{job.name}</Card.Title>
                                    <Card.Text>{job.desc}</Card.Text>
                                    <Card.Text>Lương công việc: {SeperatePrice(job.wage)}</Card.Text>
                                    <Button variant="secondary" onClick={() => Router.push(`/jobs/seekingJob/${job._id}`)}>Xem thêm</Button>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))
                }
                </div>
            </Row>
        <style jsx>
            {`
            *{
                font-size: 1.3rem;
            }
            .title{
                margin: 10% 0px;
            }
            .card-container{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
            `}
        </style>
        </div>
    )
}

export const getStaticProps = async ({params: {id}}) => {
    const res = await fetch(`${process.env.API_URL}/profiles/${id}`);
    const profile = await res.json();

    const res2 = await fetch(`${process.env.API_URL}/jobs?profile.id=${id}`);
    const fJobs = await res2.json();

    const res3 = await fetch(`${process.env.API_URL}/job-seekers?profile.id=${id}`);
    const sJobs = await res3.json();

    return {
        props: {
            profile,
            fJobs,
            sJobs
        }
    }
}


export const getStaticPaths = async () => {
    const profiles = await fetch(`${process.env.API_URL}/profiles`);
    const res = await profiles.json();

    const paths = res.map(profile => {
        return {
            params: {
                id: String(profile._id)
            }
        }
    });

    return {
        paths,
        fallback: false
    }
}