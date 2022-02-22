import React from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import AuthContext from "../../../../../context/AuthContext";
import { useContext, useState } from 'react'
import EventEmitter from "events";
import { string } from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Router from 'next/router'


const JobS = (props) => {
    const { jwt } = useContext(AuthContext);

    async function handleDelete() {
        const res = await fetch(`${process.env.API_URL}/job-seekers/${props.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        })
        console.log(res);
        if(res.status === 200) {
            alert('Xóa công việc thành công');
            Router.push('/users/jobs/myJobs');
        }
    }

    async function handleSubmit() {
        
        const jobInfo = {
            name: name,
            desc: desc,
            wage: wage,
        }

        const res = await fetch(`${process.env.API_URL}/job-seekers/${props.id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(jobInfo)
        })
        if(res.status === 200){
            alert('Cập nhật thông tin công việc thành công');
        }
        else{
            alert('Đã có lỗi, vui lòng thử lại sau');
        }
    }
    
    const [name, setName] = useState(props.job.name);
    const [desc, setDesc] = useState(props.job.desc);
    const [wage, setWage] = useState(props.job.wage);
    const [expireDate, setExpireDate] = useState(props.job.expireDate);
    const [bonusDesc, setBonusDesc] = useState(props.job.bonusDesc);
    const [numberOfPeople, setNumberOfPeople] = useState(props.job.numberOfPeople);
    return (
        <div className='container'>
            <div className='arrow'><Link href='/users/jobs/myJobs'><a><FontAwesomeIcon style={{width: '20px'}} icon={faArrowLeft}/> Quay lại</a></Link></div>
            <Form>
                <Form.Row>
                    <Form.Group controlId='jobName'>
                        <Form.Label>Tên công việc</Form.Label>
                        <Form.Control 
                            required 
                            type='text'
                            defaultValue={props.job.name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mô tả công việc</Form.Label>
                        <Form.Control
                            required 
                            as='textarea'
                            rows={3}
                            defaultValue={props.job.desc}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Điều kiện thưởng thêm</Form.Label>
                        <Form.Control
                            required 
                            as='textarea'
                            rows={3}
                            defaultValue={props.job.bonusDesc}
                            value={bonusDesc}
                            onChange={(e) => setBonusDesc(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Giá công việc</Form.Label>
                        <Form.Control
                        required
                        type='number'
                        defaultValue={props.job.wage}
                        value={wage}
                        onChange={(e) => setWage(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Số người cần</Form.Label>
                        <Form.Control
                        required
                        type='number'
                        defaultValue={props.job.numberOfPeople}
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ngày hết hạn công việc</Form.Label>
                        <Form.Control
                        required
                        type='date'
                        defaultValue={props.job.expireDate}
                        value={expireDate}
                        onChange={(e) => setExpireDate(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                </Form.Row>
                <Row style={{margin: '5%'}}>
                    <Button style={{margin: '5%'}} as={Col} variant='secondary' type='button' onClick={() => handleSubmit()}>Cập nhật thông tin công việc</Button>
                    <Button style={{margin: '5%'}} as={Col} variant='danger' type='button' onClick={() => handleDelete()}>Xóa công việc này</Button>
                </Row>
            </Form>
            <style jsx>
                {`
                .arrow{
                    margin: 5%;
                    a{
                        text-decoration: none;
                        color: var(--main-color);
                    }
                }
                
                `}
            </style>
        </div>
    )
}

export async function getStaticProps({ params: { id } }) {
    const { API_URL } = process.env; 
    var job_res = await fetch(`${API_URL}/job-seekers/?id=${id}`);
     
     const found = await job_res.json();
     return {
        props: {
           job: found[0],
           id: id
        }
    }
}

export async function getStaticPaths() {
    const { API_URL } = process.env;
    //Retrive all the possible paths
    const jobs_res = await fetch(`${API_URL}/job-seekers`);
    const jobs = await jobs_res.json();

    const paths = jobs.map(job => {
        return {
            params: {
                id: String(job._id)
            }
        }
    })
    
    //Return them to NextJS context
    return {
        paths,
        fallback: false
    }
}

export default JobS;