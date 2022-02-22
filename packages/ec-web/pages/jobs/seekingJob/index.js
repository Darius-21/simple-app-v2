import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Router from 'next/router'
import Link from 'next/link'
import { SeperatePrice } from '../../../utils/format'

export default function seekingJob(props) {
    console.log(props.jobs)
    return (
        <div className='container'>
            <div className='title'>Công việc đang tìm kiếm người làm</div>
            <div className='content-container'>
                {
                    props.jobs.map(job => (
                        <Link href={`/jobs/seekingJob/${job._id}`}>
                            <Card style={{width: '18rem'}} key={job._id}>
                                <Card.Img variant="top" src={job.coverImage ? process.env.API_URL + job.coverImage.url : ''} alt={job.name} />
                                <Card.Body>
                                    <Card.Title>{job.name}</Card.Title>
                                    <Card.Text>{job.desc}</Card.Text>
                                    <Card.Text>Lương công việc: {SeperatePrice(job.wage)}</Card.Text>
                                    <Button variant="secondary" onClick={() => Router.push(`/jobs/seekingJob/${job._id}`)}><a>Xem thêm</a></Button>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))
                }
            </div>
            <style jsx>
                {`
                .title{
                        margin-bottom: 10%;
                }
                .content-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-template-rows: auto;
                    a{
                        text-decoration: none;
                        color: white;
                    }
                }
                `}
            </style>
        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch(`${process.env.API_URL}/job-seekers`);
    const data = await res.json();
    return {
        props: {
            jobs: data
        }
    }
}
