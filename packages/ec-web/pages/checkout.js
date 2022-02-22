import React, { useContext } from "react";
import {Row, Col, Form, Button} from 'react-bootstrap'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";
import AuthContext from "../context/AuthContext";
import { getSession } from 'next-auth/client'
import {SeperatePrice} from '../utils/format'

export default function Checkout(props) {
    let pickedOption;
    for (var i of props.pickedJob.option) {
        if(i._id === props.pickedOption) {
            pickedOption = i;
            break;
        }
    }
    const stripePromise = loadStripe("pk_test_51J9CyVAgPrOZ5xHXSfWItuPJ1cIEV6O9ocI1ZWZj7DKWbh4yfOKJ7l925uQnPDeBF9mXYvUQj2IN1W8cQ31hIQ2Z00D5e8y0Vf");
    const {userProfile} = useContext(AuthContext)
    return (
        <div className='container'>
            <div className='title'>Checkout</div>
            <hr></hr>
            <Row>
                <Col>
                    <div>
                        <div className='sm-tilte'><h5>Thông tin của bạn</h5></div>
                        <div>
                            <div className='block'>Tên của bạn: <div className='info'>{userProfile[0].name}</div></div>
                            <div className='block'>Công việc lựa chọn: <div className='info'>{props.pickedJob.name}</div></div>
                            <div className='block'>Lựa chọn đã chọn: <div className='info'>{pickedOption.optionName}</div></div>
                            <div className='block'>Mô tả lựa chọn: {pickedOption.desc}</div>
                            <div className='block'>Giá tiền lựa chọn: {SeperatePrice(parseInt(pickedOption.wage))}</div>
                        </div>
                    </div>
                </Col>
               
            </Row>
            <Elements stripe={stripePromise}>
                        <InjectedCheckoutForm pickedJob={props.pickedJob} pickedOption={pickedOption} wage={pickedOption.wage} />
            </Elements>
            <style jsx>
                {`
                    .container{
                        background-color: var(--main-color);
                        color: white;
                        padding: 2% 5%;
                    }
                    hr{
                        color: white;
                    }
                    h5.sm-title{
                        font-weigth: 900;
                        font-size: 1.5rem;
                        text-decoration: underline;
                    }
                    .block{
                        display: block;
                        width: 100%;
                        margin: 2%;
                        .info{
                            display: inline;
                            font-weight: 700;

                        }
                    }
                `}
            </style>
        </div>

    )
}

export const getServerSideProps = async({req, res, query}) => {
    const session = await getSession({ req });
    
    const pickedJob = query.pickedJob;
    var pickedOption = query.pickedOption;
    const pickedOptionName = query.pickedOptionName;

    const job = await fetch(`${process.env.API_URL}/jobs?_id=${pickedJob}`)
    const data = await job.json();

    if(pickedOptionName) {
        for(var i of data[0].option) {
            if(i.optionName === pickedOptionName) {
                pickedOption = i._id;
            }
        }
    }

    return {
        props: {
        session,
        pickedJob: data[0],
        pickedOption: pickedOption
        },
    };
}