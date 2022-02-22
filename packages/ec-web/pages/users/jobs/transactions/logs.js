import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useContext, useState } from 'react'
import AuthContext from '../../../../context/AuthContext'
import { getSession } from 'next-auth/client'
import { Row, Col, Button, Carousel } from 'react-bootstrap'
import {SeperatePrice} from '../../../../utils/format'


export default function logs(props) {
    var count = 0;
    var countImage = 0;
    return (
        <div className='container'>
            <div className='title'>Những thông tin cập nhật về đơn hàng</div>
            <div className='sm-title'>Thông tin đơn hàng</div>
            <Row>
                <Col>
                    <div>Mã đơn hàng: <div className='bold inline'>{props.transaction.id}</div></div>
                </Col>
                <Col>
                    <div>Tình trạng đơn hàng: <div className='bold inline'>{props.transaction.transactionStatus}</div></div>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <div>Số tiền: <div className='bold inline'>{SeperatePrice(props.transaction.amount)}</div></div>
                </Col>
                <Col>
                    <div>Lựa chọn công việc đã chọn: <div className='bold inline'>{props.transaction.pickedOption.optionName}</div></div>
                </Col>
            </Row>
            <div>Ghi chú: {props.transaction.note ? props.transaction.note : 'Không có'}</div>
            <div className='sm-title'>Thông tin công việc</div>
            <Row>
                <Col>
                    <div>Mã công việc: <div className='bold inline'>{props.transaction.job._id}</div></div>
                </Col>
                <Col>
                    <div>Tên công việc: <div className='bold inline'>{props.transaction.job.name}</div></div>
                </Col>
            </Row>
            <div>Mô tả công việc: {props.transaction.job.desc}</div>
            <div className='sm-title'>Thông tin cập nhật về đơn hàng</div>
            {
                props.transaction.updatedLogs.map(log => (
                    <div>
                        <Row style={{marginBottom: '2%'}}>
                            <Col><div className='bold inline'>Cập nhật {++count}</div></Col>
                            <Col>
                                <div>Ghi chú: {log.note ? log.note : 'Không có'}</div>
                            </Col>
                            <Col>
                                <div>Cập nhật giai đoạn: {log.proof}</div>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: '5%'}}>
                            <div className='bottom'>Hình ảnh cập nhật:</div> 
                            <Carousel>
                             {
                                log.image.length === 0 ? <div className='inline'>Không có</div> : (
                                    log.image.map(img => (
                                        <Carousel.Item interval={5000}>
                                            <img className='d-block w-100'
                                                src={process.env.API_URL + img.url}
                                                alt={`Ảnh ${++countImage}`}
                                            />
                                        </Carousel.Item>
                                    ))
                                )
                            }
                            </Carousel>
                        </Row>
                    </div>
                ))
            }
            <div>
                {
                    props.transaction.freelancer.id === props.session.id && props.transaction.transactionStatus != 'Finish' ? (
                        <Row>
                            <Col>
                                <div className='center'><Link href={`/users/jobs/transactions/about?id=${props.transaction.id}`}><a><Button>Thêm thông tin cập nhật</Button></a></Link></div>
                            </Col>
                            <Col>
                            <div className='center'><Link href={`/users/jobs/transactions/done?id=${props.transaction.id}`}><a><Button variant='dark'>Cập nhật thông tin hoàn thành đơn hàng</Button></a></Link></div>
                            </Col>
                        </Row>
                    ) : ''
                }
            </div>
            <style jsx>
                {`
                .sm-title{
                    margin: 3%;
                    font-size: 1.4rem;
                    font-weight: 700;
                }
                .center {
                    margin: 5% 0px;
                }
                .bottom{
                    margin-bottom: 5%;
                }
                `}
            </style>
        
        </div>
    )
}

export const getServerSideProps = async({req, res, query}) => {
    const session = await getSession({req});
    const transactionId = query.transaction;
    const {API_URL} = process.env;

    const transaction = await fetch(`${API_URL}/transactions/${transactionId}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${session.jwt}`
        }
    })
    const data = await transaction.json();

    return {
        props: {
            session,
            transaction: data
        }
    }
}