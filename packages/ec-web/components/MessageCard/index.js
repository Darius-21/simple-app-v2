import Link from "next/link";
import Router from 'next/router';
import React, {useState, useContext} from 'react';
import { Card, Row, Col} from 'react-bootstrap'

export default function MessageCard(props) {
    
    return (
        <div clasName='mess-con' id='con'>
            {
                props.isSend ? <div className='user'>Người nhận: {props.mess.toUser.username}</div> : <div className='user'>Người gửi: {props.mess.fromUser.username}</div>
            }
            <div className='sm-title'>Tiêu đề: {props.mess.message[0].title}</div>
            <div className='message'>Tin nhắn: {props.mess.message[0].message}</div>
            <style jsx>
                {`
                #con{
                    width: 100%;
                    height: auto;
                    padding: 5%;
                    margin: 5%;
                    border: 1px solid white;
                    border-radius: 10px;
                    background-color: #DCFFFB;
                    .user{
                        font-size: 1.1rem;
                        font-weigth: 600;
                    }
                }
                `}
            </style>
        </div>
    )
}
