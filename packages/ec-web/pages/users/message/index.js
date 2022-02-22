import React from 'react'
import WholeSideNav from '../../../components/WholeSideNav'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import {Button, Row, Col} from 'react-bootstrap'
import { getSession } from 'next-auth/client'
import MessageCard from '../../../components/MessageCard'

export default function Message(props) {
    return (
        <div className='body-container'>
            <div className='content-container'>
            <div></div>
            <WholeSideNav props={props.user}></WholeSideNav>
            <div className='main-body'>
                <div className='main-content'>
                    <div className='title'>Tin nhắn của tôi</div>
                    <br></br>
                    <div className='myMessages'>
                        <div className='message-container'>
                            <div className='sentMess'>
                                <div className='small-title'>Tin nhắn đã gửi mới nhất</div>
                                <div>
                                    {
                                        props.sentMess.map(mess => (
                                            <MessageCard mess={mess} isSend={true}/>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='receivedMess'>
                                <div className='small-title'>Tin nhắn đã nhận mới nhất</div>
                                {
                                    props.receivedMess.map(mess => (
                                        <MessageCard mess={mess} isSend={false}/>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='addButton'><Link href='/users/message/createMessage'><Button><FontAwesomeIcon width='.8rem' icon={faPlus}/> Tạo tin nhắn mới</Button></Link>

                    </div>
                    </div>

                </div>
            </div>
            
            </div>
            <style jsx>
                {`
                .bold{
                    font-size: 1.2rem;
                    font-weigth: 700;
                }
                .myMessTitle{
                    font-size: 1.4rem;
                    margin-bottom: 5%;
                }
                .sentMess,.receivedMess{
                    margin: 5%;
                    .small-title{
                        font-weight: 500;
                        margin-bottom: 2%;
                    }
                }
                .body-container{
                    width: 100%;
                    height: auto;
                    margin-top: 5%;
                    margin-bottom: 5%;
                    .content-container{
                        margin-right: auto;
                        margin-left: auto;
                        items-align:center;
                        padding: 0px 2%;
                        display: grid;
                        grid-template-columns: .1fr .3fr 1fr .1fr;
                        .addButton{
                            
                        }

                        .main-body{
                            width: 100%;
                            position: relative;
                            .main-content{
                                display: grid;
                                border: 1px solid grey;
                                border-radius: 10px;
                                background-color: white;
                                padding: 3%;
                                
                                grid-template-columns: 1fr .3fr;
                                > div{
                                    margin: 0px 2%;
                                }
                                
                            }
                            .title{
                                color: var(--main-color);
                                font-size: 3rem;
                                font-weight: 700;
                                padding-bottom: 1.5rem;
                                text-align: left;
                                
                            }
                            
                        }
                    }
                    
                }
                `}

            </style>
        </div>
    )
}

export async function getServerSideProps ({req, res}) {
    const session = await getSession({req});
    const {API_URL} = process.env;
    const jwt = session.jwt;
    const userId = session.id;
    //Now we have userId and jwt, let fetch all the releated user message
    //First with sentMess
    const res1 = await fetch(`${API_URL}/messages/?fromUser=${userId}`,{
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    });
    const sentMess = await res1.json();

    const res2 = await fetch(`${API_URL}/messages/?toUser=${userId}`, {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    });
    const receivedMess = await res2.json();

    return {
        props: {
            jwt,
            userId,
            sentMess,
            receivedMess
        }
    }
}