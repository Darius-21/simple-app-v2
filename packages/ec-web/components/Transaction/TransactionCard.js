import React, {useContext} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import {SeperatePrice} from '../../utils/format'
import Link from 'next/link'
import AuthContext from '../../context/AuthContext';
import fecth from 'isomorphic-fetch'
import  Router  from 'next/router';

export default function TransactionCard(props) {
    const {transaction, count} = props;

    const { jwt, userProfile } = useContext(AuthContext);

    async function handleDelete(e, ctx) {
        const res1 = await fecth(`${process.env.API_URL}/transactions/${transaction._id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: JSON.stringify({transactionStatus: "Cancel"})
        })
        if(res1.status === 200) {
            alert('Hủy đơn hàng thành công');
            Router.push('/users/myTransactions');
        }
    }

    async function handleAccept(e) {
        const res1 = await fecth(`${process.env.API_URL}/transactions/${transaction._id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: JSON.stringify({transactionStatus: "WorkingOn"})
        })
        if (res1.status === 200) {
            alert('Nhận đơn hàng thành công');
            Router.push('/users/myTransactions');
        }
    }

    return (
        <div className='transaction'>
            <div className='center sm-title'>Thông tin đơn hàng {count}</div>
            <Row>
                <Col style={{paddingLeft: '5%'}}>
                    <div>Công việc: <div className='bold'>{transaction.job.name}</div></div>
                    <div>Option chọn: {transaction.pickedOption.optionName}</div>
                    <div>Ghi chú của bạn: {transaction.note ? transaction.note : ''}</div>
                </Col>
                <Col>
                    <div>Số tiền: <div className='bold'>{SeperatePrice(transaction.amount)}</div></div>
                    <div>Ngày tạo đơn: {transaction.createdAt ? transaction.createdAt.substring(0,10) : ''}</div>
                    <div>Trạng thái đơn hàng: <div className='bold inline'>{transaction.transactionStatus}</div></div>
                </Col>
            </Row>
            {
                transaction.transactionStatus === 'New' ? (
                    <div className='center btn-zone'>
                        <div className='btn-container'>
                            <Button onClick={(e) => handleAccept(e)} className='Button'>Nhận đơn hàng này</Button>
                        </div>
                        <div className='btn-container'>
                            <Button variant='danger' onClick={(e) => handleDelete(e)}>Hủy đơn hàng</Button>
                        </div>
                        <div className='btn-container'>
                            <Link href={`users/message/createMessage?toUser=${transaction.freelancer.id}`}><a><Button variant='secondary' className='Button'>Nhắn tin với Freelancer</Button></a></Link>
                        </div>
                    </div>
                ) : (transaction.transactionStatus === 'WorkingOn' ? (
                    <div className='center btn-zone'>
                        <div className='btn-container'>
                            <Link href={`/users/jobs/transactions/logs?transaction=${transaction.id}`}><a><Button variant='dark'>Xem thông tin cập nhật đơn hàng</Button></a></Link>
                        </div>
                        <div className='btn-container'>
                            <Link href={`users/message/createMessage?toUser=${transaction.freelancer.id}`}><a><Button variant='secondary' className='Button'>Nhắn tin với Freelancer</Button></a></Link>
                        </div>
                        
                    </div>
                ): (transaction.transactionStatus === 'Finish' ? (
                    (
                    <div className='center btn-zone'>
                        <div className='btn-container'>
                            <Link href={`/users/jobs/transactions/logs?transaction=${transaction.id}`}><a><Button variant='dark'>Xem thông tin cập nhật đơn hàng</Button></a></Link>
                        </div>
                        <div className='btn-container'>
                            <Link href={`/jobs/${transaction.job.id}`}><a><Button className='Button'>Xem đánh giá công việc này</Button></a></Link>
                        </div>
                    </div>
                    )
                ) : (
                    (
                    <div className='center btn-zone'>
                        <div className='btn-container'>
                            <Link href={`/checkout?pickedJob=${transaction.job.id}&pickedOptionName=${transaction.pickedOption.optionName}`}><a><Button variant='danger'>Đặt lại đơn hàng</Button></a></Link>
                        </div>
                        <div className='btn-container'>
                            <Link href={`/jobs/${transaction.job.id}`}><a><Button className='Button'>Xem công việc này</Button></a></Link>
                        </div>
                    </div>
                )
                )))
            }
            <style jsx>
                {`
                .transaction{
                    background-color: white;
                    border-radius: 10px;
                    padding: 2%;
                    margin: 2%;
                }
                .center{
                    text-align:center;

                    .btn-container{
                        display: inline;
                        margin: 2%;
                    }
                }
                .bold{
                    display: inline;
                    font-weight: 600;
                }
                .sm-title{
                    font-size: 1.3rem;
                    font-weight: 600;
                }
                .center.btn-zone{
                    margin-top: 3%;
                }
                `}
            </style>
        </div>
    )
}

export function TransactionCard2(props) {
    const {transaction, count} = props;

    const { jwt, userProfile } = useContext(AuthContext);

    async function handleDelete(e, ctx) {
        const res1 = await fecth(`${process.env.API_URL}/transactions/${transaction._id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: JSON.stringify({transactionStatus: "Cancel"})
        })
        if(res1.status === 200) {
            alert('Hủy đơn hàng thành công');
            Router.push('/users/myTransactions');
        }
    }

    async function handleAccept(e) {
        const res1 = await fecth(`${process.env.API_URL}/transactions/${transaction._id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            },
            body: JSON.stringify({transactionStatus: "WorkingOn"})
        })
        if (res1.status === 200) {
            alert('Nhận đơn hàng thành công');
            Router.push('/users/myTransactions');
        }
    }

    return (
        <div className='transaction'>
            <div className='center sm-title'>Thông tin đơn hàng {count}</div>
            <Row>
                <Col style={{paddingLeft: '5%'}}>
                    <div>Công việc: <div className='bold'>{transaction.job.name}</div></div>
                    <div>Option chọn: {transaction.pickedOption.optionName}</div>
                    <div>Ghi chú của bạn: {transaction.note ? transaction.note : ''}</div>
                </Col>
                <Col>
                    <div>Số tiền: <div className='bold'>{SeperatePrice(transaction.amount)}</div></div>
                    <div>Ngày tạo đơn: {transaction.createdAt ? transaction.createdAt.substring(0,10) : ''}</div>
                    <div>Trạng thái đơn hàng: <div className='bold inline'>{transaction.transactionStatus}</div></div>
                </Col>
            </Row>
            {
                transaction.transactionStatus === 'New' ? (
                    <div className='center btn-zone'>
                        <div className='btn-container'>
                            <Button variant='danger' onClick={(e) => handleDelete(e)}>Hủy đơn hàng</Button>
                        </div>
                        <div className='btn-container'>
                            <Link href={`users/message/createMessage?toUser=${transaction.freelancer.id}`}><a><Button variant='secondary' className='Button'>Nhắn tin với Freelancer</Button></a></Link>
                        </div>
                    </div>
                ) : (transaction.transactionStatus === 'WorkingOn' ? (
                    <div className='center btn-zone'>
                        <div className='btn-container'>
                            <Link href={`/users/jobs/transactions/logs?transaction=${transaction.id}`}><a><Button variant='dark'>Xem thông tin cập nhật đơn hàng</Button></a></Link>
                        </div>
                        <div className='btn-container'>
                            <Link href={`users/message/createMessage?toUser=${transaction.freelancer.id}`}><a><Button variant='secondary' className='Button'>Nhắn tin với Freelancer</Button></a></Link>
                        </div>
                        
                    </div>
                ): (transaction.transactionStatus === 'Finish' ? (
                    (
                    <div className='center btn-zone'>
                        <div className='btn-container'>
                            <Link href={`/users/jobs/transactions/logs?transaction=${transaction.id}`}><a><Button variant='dark'>Xem thông tin cập nhật đơn hàng</Button></a></Link>
                        </div>
                        <div className='btn-container'>
                            <Link href={`/users/jobs/rating?id=${transaction.job.id}`}><a><Button className='Button'>Đánh giá công việc này</Button></a></Link>
                        </div>
                    </div>
                    )
                ) : (
                    (
                    <div className='center btn-zone'>
                        <div className='btn-container'>
                            <Link href={`/checkout?pickedJob=${transaction.job.id}&pickedOptionName=${transaction.pickedOption.optionName}`}><a><Button variant='danger'>Đặt lại đơn hàng</Button></a></Link>
                        </div>
                        <div className='btn-container'>
                            <Link href={`/jobs/${transaction.job.id}`}><a><Button className='Button'>Xem công việc này</Button></a></Link>
                        </div>
                    </div>
                )
                )))
            }
            <style jsx>
                {`
                .transaction{
                    background-color: white;
                    border-radius: 10px;
                    padding: 2%;
                    margin: 2%;
                }
                .center{
                    text-align:center;

                    .btn-container{
                        display: inline;
                        margin: 2%;
                    }
                }
                .bold{
                    display: inline;
                    font-weight: 600;
                }
                .sm-title{
                    font-size: 1.3rem;
                    font-weight: 600;
                }
                .center.btn-zone{
                    margin-top: 3%;
                }
                `}
            </style>
        </div>
    )
}