import React from 'react'
import { getSession } from 'next-auth/client'
import TransactionCard, { TransactionCard2 } from '../../components/Transaction/TransactionCard'
export default function jobsSeekWaiting(props) {
    var count = 0;
    var fcount = 0;
    return (
        <div className='container'>
            <div className='title'>Đơn hàng của bạn</div>
            <div className='small-table'>
                <div className='sm-title'>Đơn mua: <div className='inline bold'>{props.transactionData.length}</div></div>
                {
                    props.transactionData.length > 0 ? (
                        props.transactionData.map(transaction => (
                        <TransactionCard2 transaction={transaction} count={++count}/>
                    ))
                    ) : <div className='message'>Không tồn tại đơn hàng đang xét của bạn, hãy thực hiện một thanh toán để có thể xem thông tin đơn hàng ở đây nha!</div>
                }
            </div>
            <div className='small-table'>
                <div className='sm-title'>Đơn làm: <div className='inline bold'>{props.fTransactionData.length}</div></div>
                {
                    props.fTransactionData.length > 0 ? (
                        props.fTransactionData.map(transaction => (
                        <TransactionCard transaction={transaction} count={++fcount}/>
                    ))
                    ) : <div className='message'>Không tồn tại đơn hàng đang xét của bạn, hãy thực hiện một thanh toán để có thể xem thông tin đơn hàng ở đây nha!</div>
                }
            </div>
            <style jsx>
                {`
                .title{
                    margin-bottom: 3%;
                }
                .sm-title{
                    font-size: 1.5rem;
                    color: white
                }
                .small-table{
                    width: 100%;
                    background-color: var(--main-color);
                    border-radius: 10px;
                    padding: 3% 2%;
                    margin: 3% 0px;
                }
                .message{
                    text-align: center;
                    font-size: 1.5rem;
                    margin: 5% 0px;
                    color: white;
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
    const fTransactionData = await res2.json()
    
    return {
        props: {
        session,
        transactionData,
        fTransactionData
        },
    };
}