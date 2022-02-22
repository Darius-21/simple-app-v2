import React from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import { useContext, useState } from 'react'
import HeaderContext from '../../../context/HeaderContext'
import { SeperatePrice } from '../../../utils/format';
import Link from 'next/link'
import AuthContext from '../../../context/AuthContext';
import fecth from 'isomorphic-fetch'
import  Router  from 'next/router';
import { getSession } from 'next-auth/client';


export default function rating(props) {
    const [star, setStar] = useState(5);
    const [comment, setComment] = useState('')
    
    async function handleSend(e, ctx) {
        const data = {
            rating: star,
            comment: comment,
            fromUser: props.session.id
        }
        const oldDataRes = await fetch(`${process.env.API_URL}/jobs/${props.job.id}`);
        const oldData = await oldDataRes.json();

        var finalData = {
            rating: []
        }
        finalData.rating.push(data)

        for(var i of oldData.rating) {
            finalData.push(i)
        }

        const send = await fetch(`${process.env.API_URL}/jobs/${props.job.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.session.jwt}`
            },
            body: JSON.stringify(finalData)
        })
        const res = await send.json();
        if(res.status === 200) {
            alert('Thành công gửi đánh giá');
            Router.push('/users/myTransactions');
        }
    }
    
    return (
        <div className='container'>
            <div className='title'>Đánh giá công việc</div>
            <div>
                <Form>
                    <Form.Label>Sao đánh giá </Form.Label>
                    <Form.Control type='number' value={star}
                        onChange={e => setStar(e.target.value)}></Form.Control>
                    <Form.Label>Đánh giá </Form.Label>
                    <Form.Control as='textarea'
                        value={comment} onChange={ e=> setComment(e.target.value)}></Form.Control>
                    <div className='center'>
                        <Button onClick={(e) => handleSend(e)} variant='outline-danger'>Gửi đánh giá</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export const getServerSideProps = async({req, res, query}) => {
    const session = await getSession({req});
    const jobId = query.id;
    const job = await fetch(`${process.env.API_URL}/jobs/${jobId}`);
    const data = await job.json();
    return {
        props: {
            session,
            job: data
        }
    }
}