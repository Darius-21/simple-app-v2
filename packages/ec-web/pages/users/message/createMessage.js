import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useState, useContext } from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import AuthContext from '../../../context/AuthContext'
import { getSession } from 'next-auth/client'

export default function createMessage(props) {
    
    const [toUser, setToUser] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const { userProfile, jwt } = useContext(AuthContext)
    const [validated, setValidated] = useState(false);

    const checkValidate = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    async function handleSend(e, ctx) {
        checkValidate(e);
        if(props.toUser) {
            const user = await fetch(`${process.env.API_URL}/profiles/?user.username=${props.toUser}`);
            var toSendUser = await user.json();
        if(toSendUser.length === 0){
            alert('There is no user with this username. Pls try again');
        }
        else {
            toSendUser = toSendUser[0];
        
        
            //If there is a record of sending to this people, put; if not post
            const recordMessage = await fetch(`${process.env.API_URL}/messages/?toUser=${toSendUser.user._id}&fromUser=${userProfile[0].user._id}`, {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${jwt}`
                }
            })
            const takedRecord = await recordMessage.json();
            console.log(takedRecord[0]);
            if(takedRecord.length != 0) {
                //Now PUT new message
                var messageSend = { message : []}
                let message
                for (var i of takedRecord[0].message) {
                    message = {
                        title: i.title,
                        message: i.message
                    }
                    console.log(message)
                    messageSend.message.push(message)
                }
                console.log(messageSend)
                const send = await fetch(`${process.env.API_URL}/messages/${takedRecord[0]._id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization" : `Bearer ${jwt}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageSend)
                })
                const res = await send.json();
                if(res._id) {
                    alert('G???i tin nh???n th??nh c??ng');
                    Router.push('/users/message');
                }
            }
            else{
                const messageSend = {
                    message: [
                        {
                            title: title,
                            message: message
                        }
                    ],
                    fromUser: userProfile[0].user,
                    toUser: toSendUser.user
                };
                console.log(JSON.stringify(messageSend));
                const send = await fetch(`${process.env.API_URL}/messages`, {
                    method: "POST",
                    headers: {
                        "Authorization" : `Bearer ${jwt}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageSend)
                });
                const res = await send.json();
                if(res._id) {
                    alert('G???i tin nh???n th??nh c??ng');
                    Router.push('/users/message');
                }
            }
        }
        }
        else {
            const user = await fetch(`${process.env.API_URL}/profiles/?user.username=${toUser}`);
            var toSendUser = await user.json();
        if(toSendUser.length === 0){
            alert('There is no user with this username. Pls try again');
        }
        else {
            toSendUser = toSendUser[0];
        
        
            //If there is a record of sending to this people, put; if not post
            const recordMessage = await fetch(`${process.env.API_URL}/messages/?toUser=${toSendUser.user._id}&fromUser=${userProfile[0].user._id}`, {
                method: "GET",
                headers: {
                    "Authorization" : `Bearer ${jwt}`
                }
            })
            const takedRecord = await recordMessage.json();
            console.log(takedRecord[0]);
            if(takedRecord.length != 0) {
                //Now PUT new message
                var messageSend = { message : []}
                let message
                for (var i of takedRecord[0].message) {
                    message = {
                        title: i.title,
                        message: i.message
                    }
                    console.log(message)
                    messageSend.message.push(message)
                }
                console.log(messageSend)
                const send = await fetch(`${process.env.API_URL}/messages/${takedRecord[0]._id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization" : `Bearer ${jwt}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageSend)
                })
                const res = await send.json();
                if(res._id) {
                    alert('G???i tin nh???n th??nh c??ng');
                    Router.push('/users/message');
                }
            }
            else{
                const messageSend = {
                    message: [
                        {
                            title: title,
                            message: message
                        }
                    ],
                    fromUser: userProfile[0].user,
                    toUser: toSendUser.user
                };
                console.log(JSON.stringify(messageSend));
                const send = await fetch(`${process.env.API_URL}/messages`, {
                    method: "POST",
                    headers: {
                        "Authorization" : `Bearer ${jwt}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageSend)
                });
                const res = await send.json();
                if(res._id) {
                    alert('G???i tin nh???n th??nh c??ng');
                    Router.push('/users/message');
                }
            }
        }
        }
        
        
    }

    if(props.toUser) {
        return (
            <div className='container'>
                <Form noValidate validate={validated}>
                    <Form.Group>
                        <Form.Label>Ng?????i nh???n</Form.Label>
                        <Form.Control
                            placeholder='Nh???p t??n ng?????i d??ng c???a ng?????i b???n mu???n g???i tin nh???n'
                            type='text'
                            readOnly plaintext
                            defaultValue={props.toUser}
                            required
                            ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ti??u ?????</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ti??u ????? v??? n???i dung ch??nh c???a tin nh???n c???a b???n'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tin nh???n</Form.Label>
                        <Form.Control
                            as='textarea'
                            placeholder='N???i dung chi ti???t th??ng tin c???n trao ?????i'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            ></Form.Control>
                    </Form.Group>
                    <Button variant='danger' onClick={(e) => handleSend(e)}>G???i tin nh???n</Button>
                </Form>
            </div>
        )
    }
    else {
        return (
            <div className='container'>
                <Form noValidate validate={validated}>
                    <Form.Group>
                        <Form.Label>Ng?????i nh???n</Form.Label>
                        <Form.Control
                            placeholder='Nh???p t??n ng?????i d??ng c???a ng?????i b???n mu???n g???i tin nh???n'
                            value={toUser}
                            type='text'
                            onChange={(e) => setToUser(e.target.value)}
                            
                            required
                            ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ti??u ?????</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ti??u ????? v??? n???i dung ch??nh c???a tin nh???n c???a b???n'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tin nh???n</Form.Label>
                        <Form.Control
                            as='textarea'
                            placeholder='N???i dung chi ti???t th??ng tin c???n trao ?????i'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            ></Form.Control>
                    </Form.Group>
                    <Button variant='danger' onClick={(e) => handleSend(e)}>G???i tin nh???n</Button>
                </Form>
            </div>
        )
    }
}

export const getServerSideProps = async({req, res, query}) => {
    const session = await getSession({ req });
    const toUser = query.toUser;
    if(toUser) {
        const username = await fetch(`${process.env.API_URL}/profiles?user._id=${toUser}`);
        const data = await username.json();
        return {
            props: {
            session,
            toUser : data[0].user.username
            },
        };
    }
    else {
        return {
            props: {
                session
            }
        }
    }
    
}