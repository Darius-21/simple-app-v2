import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { getSession } from 'next-auth/client'
import { SeperatePrice } from '../../utils/format'

export default function receiveMoney(props) {
    console.log(props.session)
    return (
        <div className='container'>
            <div className='title'>Rút tiền từ số dư tài khoản</div>
            <div className='balance'>Số dư hiện tại: <div className='bold inline'>{SeperatePrice(props.personalData.balance)} VND</div></div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control type="email" placeholder="Hãy điền tài khoản email thông báo số dư" />
                    <Form.Text className="text-muted">
                    Chúng tôi sẽ không chia sẻ thông tin của bạn
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBalanceWithdraw">
                    <Form.Label>Enter amount you want to withdraw</Form.Label>
                    <Form.Control type="number" placeholder= {`Số tiền cao nhất bạn có thể rút ${props.personalData.balance}`} />
                    <Form.Text className="text-muted">
                    {

                    }
                    </Form.Text>
                </Form.Group>
                <Button>Gửi yêu cầu rút tiền</Button>
            </Form>
            <style jsx>
                {`
                .balance {
                    font-size: 1.5rem;
                    text-align: center
                }
                `}
            </style>
        </div>
    )
}


export const getServerSideProps = async({req, res}) => {
    const session = await getSession({ req });
    const {API_URL} = process.env;
    //Fetching transaction that user is the buyer
    const res1 = await fetch(`${API_URL}/transactions?seeker.id=${session.id}`, {
        headers: {
            "Authorization": `Bearer ${session.jwt}`
        }
    });
    const transactionData = await res1.json();
    //Fetching transaction that user is the freelancer
    const res2 = await fetch(`${API_URL}/transactions?freelancer.id=${session.id}`, {
        headers: {
            "Authorization": `Bearer ${session.jwt}`
        }
    })
    const fTransactionData = await res2.json();
    const myData = await fetch(`${API_URL}/users/me`, {
        headers: {
            "Authorization": `Bearer ${session.jwt}`
        }
    })
    const personalData = await myData.json();
    
    return {
        props: {
        session,
        transactionData,
        fTransactionData,
        personalData
        },
    };
}
