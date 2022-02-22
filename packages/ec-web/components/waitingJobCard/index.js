import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { SeperatePrice } from '../../utils/format'
import Router from 'next/router'

export default function JobCard(props) {
    async function handleAccept(e) {
        const transaction = {
            "transactionStatus" : "WorkingOn"
        }
        const action = await fetch(`${process.env.API_URL}/transactions/${props.trans.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.session.jwt}`
            },
            body: JSON.stringify(transaction)
            
        })
        if (action.status === 200) {
            alert('Nhận đơn hàng thành công');
            Router.push('/users/jobs');
        }
    }

    async function handleCancel(e) {
        const transaction = {
            "transactionStatus" : "Cancel"
        }
        const action = await fetch(`${process.env.API_URL}/transactions/${props.trans.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.session.jwt}`
            },
            body: JSON.stringify(transaction)
            
        })
        if (action.status === 200) {
            alert('Hủy đơn hàng thành công');
            Router.push('/users/jobs');
        }
    }
    
    return (
        <div className='card-container'>
            <Row>
                <Col>
                    Thông tin đơn hàng
                    <div>Email người mua: <div className='bold inline'>{props.trans.seeker.email}</div></div>
                    <div>Tên người mua: <div className='bold inline'>{props.trans.seeker.username}</div></div>
                    <div>Công việc: <div className='bold inline'>{props.trans.job.name}</div></div>
                    <div>Lựa chọn: <div className='bold inline'>{props.trans.pickedOption.optionName}</div></div>
                    <div>Ngày nhận đơn: <div className='bold inline'>{props.trans.createdAt.substring(0,10)}</div></div>
                </Col>
                <Col>
                    <div className='center'>
                        Giá tiền: <div className='bold'>{SeperatePrice(props.trans.amount)}</div>
                    </div>
                    <div className='center'>
                        <Button onClick={(e) => handleAccept(e)}>Nhận đơn hàng</Button>
                    </div>
                    <div className='center'>
                        <Button variant='danger' onClick={(e) => handleCancel(e)}>Hủy đơn hàng</Button>
                    </div>
                </Col>
            </Row>
        <style jsx>
            {`
            .card-container{
                width: 70%;
                padding: 3%;
                border-radius: 10px;
                background-color: rgb(148,222,246);
                margin: 2% auto;
            }
            .center{
                margin: 2%;
            }
            `}
        </style>    
        </div>

    )
}
