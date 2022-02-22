import React from 'react'
import { useState, useContext } from 'react';
import { getSession } from 'next-auth/client';
import AuthContext from '../../../../context/AuthContext';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Router from 'next/router'

export default function done(props) {
    var today = new Date();
    var date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

    const [proof, setProof] = useState('');
    const [note, setNote] = useState('');
    const [image, setImage] = useState('');
    const [validated, setValidated] = useState(false);

    const checkValidate = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    async function handleUpdate(e) {
        checkValidate(e);

        if(validated) {
            const data = {
                updatedLogs: [],
                transactionStatus: 'Finish'
            }
            const currentTransData = await fetch(`${process.env.API_URL}/transactions/${props.transaction.id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${props.session.jwt}`
                }
            });
            //Now we have had out old data
            const oldData = await currentTransData.json();
            for (var i of oldData.updatedLogs) {
                data.updatedLogs.push({
                    note: i.note,
                    proof: i.proof,
                    updateDate: i.updateDate,
                    image: i.image
                })
            }
            //Now we have added all the old data into our new array, let add the new one in
            data.updatedLogs.push({
                note: note,
                proof: proof,
                updatedDate: new Date(),
            })
            console.log(data)
            var formData = new FormData();
            formData.append('data', JSON.stringify(data));
            if(image) {
                for(var i of image) {
                    formData.append(`files.image`, i, i.name)
                }
            }

            const sendLogs = await fetch(`${process.env.API_URL}/transactions/${props.transaction.id}`, {
                method: "PUT",
                headers: {
                    "Authorization" : `Bearer ${props.session.jwt}`
                },
                body: formData
            })
            const status = await sendLogs.json();

            //Now this is the process where we update users 'balance
            const oldBalance = await fetch(`${process.env.API_URL}/users/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${props.session.jwt}`
                }
            })
            var newBody = await oldBalance.json();
            newBody.balance = parseFloat(props.transaction.amount) + parseFloat(newBody.balance);
            console.log(newBody)
            const updateBalance = await fetch(`${process.env.API_URL}/users/${props.session.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${props.session.jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBody)
            });
            var balanceStatus = await updateBalance.json();
            console.log(balanceStatus);
            if(status.id) {
                alert('Gửi cập nhật tiến độ thành công');
            }
            Router.push('/users/jobs/workingOn')
        }
    }
    return (
        <div className='container'>
            <div className='title'>Cập nhật thông tin hoàn thành đơn hàng</div>
            <Form noValidate validated={validated}>
                <Row style={{marginBottom: '5%'}}>
                    <Col>
                        <Form.Group>
                            <Form.Label style={{fontWeight: '900'}}>Ngày cập nhật</Form.Label>
                            <Form.Control
                            readOnly
                            plaintext
                            defaultValue={date}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label style={{fontWeight: '900'}}>Mã đơn hàng</Form.Label>
                            <Form.Control
                                readOnly
                                defaultValue={props.transaction.id}
                                plaintext></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label style={{fontWeight: '900'}}>Tên công việc</Form.Label>
                            <Form.Control
                            readOnly
                            defaultValue={props.transaction.job.name}
                            plaintext></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label style={{fontWeight: '900'}}>Tên lựa chọn</Form.Label>
                            <Form.Control
                            readOnly
                            defaultValue={props.transaction.pickedOption.optionName}
                            plaintext></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label style={{fontWeight: '900'}}>Mô tả lựa chọn</Form.Label>
                            <Form.Control
                            as='textarea'
                            readOnly
                            defaultValue={props.transaction.pickedOption.desc}
                            plaintext></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Form.Group>
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                        as='textarea'
                        value={note}
                        onChange={(e) => setNote(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Minh chứng tiến độ công việc</Form.Label>
                    <Form.Control
                        as='textarea'
                        value={proof}
                        required
                        onChange={(e) => setProof(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group style={{marginTop: '2%'}}>
                    <Form.Label style={{marginRight: '3%'}}>Minh chứng tiến độ công việc (Hình ảnh)</Form.Label>
                    <Form.Control
                        type='file'
                        multiple
                        onChange={(e) => setImage(e.target.files)}></Form.Control>
                </Form.Group>
                <div className='center'>
                    <Button variant='danger' onClick={(e) => handleUpdate(e)}>Cập nhật tiến độ công việc</Button>
                </div>
            </Form>

            <style jsx>
                {`
                .title{
                    margin-bottom: 5%;
                }
                .center{
                    margin-top: 5%;
                }
                `}
            </style>
        </div>
    )
}
export const getServerSideProps = async({req,res, query}) => {
    const session = await getSession({req});

    const Id = query.id;
    //Now we need to fecth data of the transaction that has the id match with the query
    const transaction = await fetch(`${process.env.API_URL}/transactions/${Id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session.jwt}`
        }
    });
    const data = await transaction.json();
    return {
        props: {
            session,
            transaction: data
        }
    }
}