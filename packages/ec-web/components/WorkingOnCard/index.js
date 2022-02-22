import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { SeperatePrice, calculateDueDate } from '../../utils/format'
import Router from 'next/router'
import Link from 'next/link'


export default function JobCard(props) {
    console.log(calculateDueDate(props.trans.createdAt, props.trans.job.timeFinshUnit, props.trans.job.timeFinsh))
    async function handleUpdate(e) {
        
    }

    async function handleFinish(e) {
    
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
                        <Link href={`/users/jobs/transactions/about?id=${props.trans.id}`}><a><Button onClick={(e) => handleUpdate(e)}>Cập nhật đơn hàng</Button></a></Link>
                    </div>
                    <div className='center'>
                        <Link href={`/users/jobs/transactions/done?id=${props.trans.id}`}><a><Button variant='danger' onClick={(e) => handleFinish(e)}>Hoàn thành đơn hàng</Button></a></Link>
                    </div>
                    <div className='center'>
                        <Link href={`/users/message?toUser=${props.trans.freelancer.id}`}><a><Button variant='dark' onClick={(e) => handleFinish(e)}>Nhắn tin với người mua</Button></a></Link>
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
