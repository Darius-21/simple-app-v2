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


const JobF = (props) => {
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
        for(var i in options) {
            optionname.push('option' + i.toString());
        }
        let elements
        let tempOptions = []
        let optionName, optionDesc, optionWage 
        for(var i in options) {
            elements = document.getElementsByClassName(optionname[i]);
            optionName = elements[0].value;
            optionDesc = elements[1].value;
            optionWage = elements[2].value;
            tempOptions.push({
                optionName: optionName,
                desc: optionDesc,
                wage: optionWage
            })
        }
        setOptions(tempOptions)
        const jobInfo = {
            name: name,
            desc: desc,
            startingPrice: startingPrice,
            option: options
        }

        const res = await fetch(`${process.env.API_URL}/jobs/${props.id}`, {
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
    const [options, setOptions] = useState(props.job.option)
    const [startingPrice, setStartingPrice] = useState(props.job.startingPrice)
    let optionname = [];
    
    var count = 0;
    return (
        <div className='container'>
            <div className='arrow'><Link href='/users/jobs/myJobs'><a><FontAwesomeIcon icon={faArrowLeft}/> Quay lại</a></Link></div>
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
                        <Form.Label>Giá khởi điểm</Form.Label>
                        <Form.Control
                        required
                        type='number'
                        defaultValue={props.job.startingPrice}
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Những lựa chọn của công việc</Form.Label>
                        {
                            props.job.option.map(option => (
                                <Form.Group>
                                    <Form.Label>Tên lựa chọn {count}</Form.Label>
                                    <Form.Control 
                                    required
                                    type='text'
                                    className={'option' + count}
                                    defaultValue={option.optionName}></Form.Control>
                                    <Form.Label>Mô tả lựa chọn</Form.Label>
                                    <Form.Control 
                                    required
                                    as='textarea'
                                    className={'option' + count}
                                    defaultValue={option.desc}></Form.Control>
                                    <Form.Label>Giá lựa chọn</Form.Label>
                                    <Form.Control 
                                    required
                                    type="number"
                                    className={'option' + count++}
                                    defaultValue={option.wage}></Form.Control>
                                </Form.Group>
                            ))
                        }
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
    var job_res = await fetch(`${API_URL}/jobs/?id=${id}`);
     
     if (!job_res) {
        job_res = await fetch(`${API_URL}/job-seekers/?id=${id}`)
     }
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
    const jobs_res = await fetch(`${API_URL}/jobs`);
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

export default JobF;