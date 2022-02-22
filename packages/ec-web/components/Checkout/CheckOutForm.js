import React, { useState, useContext } from "react";
import {Form, Row, Col, Button} from 'react-bootstrap'
import fetch from 'isomorphic-fetch'
import nookies from 'nookies'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from './CardSection';
import AuthContext from "../../context/AuthContext";
import Router from 'next/router'
import axios from 'axios';
import { CARD_OPTIONS } from "../../constants/stripe/CARD_OPTIONS";
import { SeperatePrice, calculateDueDate } from "../../utils/format";


export default function CheckoutForm(props) {

    const {userProfile, jwt, userId} = useContext(AuthContext);

    const [note, setNote] = useState('');
    const [email, setEmail] = useState(userProfile[0].user.email);
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleCardDetailsChange = event => {
        event.error ? setCheckoutError(event.error.message) : setCheckoutError();
    }

    const {pickedOption, pickedJob } = props;
    

    async function submitTransaction(e) {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const billingDetails = {
            name: userProfile[0].name,
            email: email,
            address: {
                city: city,
                line1: 'Address 1',
                state: '',
                postal_code: ''
            }
        };
        
        setProcessingTo(true);

        const cardElement = elements.getElement('card');
        const amount = pickedOption.wage;

        try {
            const { data: clientSecret } = await axios.post("/api/stripe-payment-intent", {
                amount: amount
            });
            
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: billingDetails
            });
            console.log(paymentMethodReq)
            if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
            }
            
            const {error} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
            });

            if(error) {
                setCheckoutError(error.message);
                setProcessingTo(false);
                return;
            }
            console.log(error)
            const today = new Date();
            const expireDate = calculateDueDate(today, pickedJob.timeFinishUnit, pickedJob.timeFinish)
            const dataSend = {
                job: pickedJob._id,
                seeker: userProfile[0].user._id,
                pickedOption: {
                    optionName: pickedOption.optionName,
                    desc: pickedOption.desc,
                    wage: pickedOption.wage
                },
                amount: pickedOption.wage,
                paymentStatus: 'paid',
                transactionStatus: 'New',
                note: note,
                freelancer: pickedJob.profile.user,
                expireDate: expireDate
            }
            console.log(dataSend)
            const transaction = await fetch(`${process.env.API_URL}/transactions`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify(dataSend)
            })
            if(transaction.status === 200) {
                alert('Thành công đặt đơn');
                Router.push('/thankyou');
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    

    return (
        <div className='container'>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='text'
                        name='receipt-email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={userProfile[0].user.email}>
                    </Form.Control>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Địa chỉ thanh toán</Form.Label>
                            <Form.Control
                                as='textarea'
                                placeholder='Địa chỉ'
                                name='address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Thành phố</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Thành phố'
                                name='city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Quận</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Quận'
                                name='district'></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                        as='textarea'
                        value = {note}
                        onChange={(e) => setNote(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                
            </Form>
            <div className="stripe-form-container">
                    <form className="stripe-form w-308px lg:w-600px border border px-4 lg:px-8 py-6 lg:py-10 m-auto">
                        <h2 className="text-white mb-6 uppercase font-600">Stripe Payment: Pay with card</h2>
                        <div className="mb-4">
                            <h6 className="text-sm mb-1 text-white">Card Information</h6>
                            <CardElement
                                options={CARD_OPTIONS}
                                onChange={handleCardDetailsChange}
                            />
                        </div>
                        {checkoutError ? <div className="text-sm my-4 text-white">{checkoutError}</div> : null}
                        <div className='button-row'>
                        <Button type='button' variant='secondary' id='clickBtn' onClick={(e) => submitTransaction(e)}  disabled={isProcessing || !stripe}>
                            {isProcessing ? "Processing..." : `Pay ${SeperatePrice(props.wage)} VND`}
                        </Button>
                        </div>
                    </form>
            </div>

            <style jsx>
                {`
                .stripe-form-container{
                    margin: 5% 0px;
                    width: 100%;
                    #clickBtn{
                        margin-left: auto;
                        margin-right: auto;
                        flex: 1;
                        width: 50%;
                    }
                    .button-row{
                        width: 100%;
                        align-items: center;
                        display: flex;
                    }
                }
                `}
            </style>
        </div>)
}