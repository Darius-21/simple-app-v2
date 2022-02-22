import React from 'react'
import WholeSideNav from '../../components/WholeSideNav'
import StatisticBoard from '../../components/StatisticBoard'
import NoteBoard from '../../components/NoteBoard'
import { getSession } from 'next-auth/client'
import { SeperatePrice } from '../../utils/format'


export default function dashboard(props) {
    const {
        session,
        freelancerJobs,
        seekerJobs,
        transactionSeeker,
        transactionFreelancer
        } = props;
    var totalJob = 0; //checked
    var totalReceive = 0;
    var pendingTotalReceive = 0;
    var totalSpend = 0;
    var pendingTotalSpend = 0;
    var totalWorkingOn = 0;
    var totalWaiting = 0;
    var totalBuy  =  0; //checked
    var totalJobSeek = 0; //checked
    
    totalJob = freelancerJobs.length + seekerJobs.length;
    totalJobSeek = seekerJobs.length;
    totalBuy = transactionSeeker.length;
    
    for (var i of transactionFreelancer) {
        if(i.transactionStatus === 'WorkingOn') {
            ++totalWorkingOn;
            pendingTotalReceive += i.amount;
        } 
        else{
            if(i.transactionStatus === 'Finish') {
                totalReceive += i.amount;
            } 
            else {
                ++totalWaiting;
            }
        }
    }
    totalReceive = SeperatePrice(totalReceive.substring(1, totalReceive.length - 3)) + 'K';
    pendingTotalReceive = SeperatePrice(pendingTotalReceive.substring(1, pendingTotalReceive.length - 3)) + 'K';
    
    for(var i of transactionSeeker) {
        if(i.transactionStatus === 'WorkingOn') {
            pendingTotalSpend += i.amount;

        }
        else {
            if(i.transactionStatus === 'Finish') {
                totalSpend += i.amount;

            } 
            else {

            }
        }
        ++totalBuy;
    }
    
    return (
        <div className='body-container'>
            <div className='content-container'>
            <div></div>
            <WholeSideNav props={props.user}></WholeSideNav>
            <div className='main-body'>
                <div className='main-content'>
                    <div className='title'>Bảng điều khiển</div>
                    <br></br>
                    <div className='own-container'>
                        <StatisticBoard statistic={[[totalJob,'Tổng số công việc của bạn'],[totalReceive, 'Tổng thu nhập', pendingTotalReceive],[totalSpend, 'Tổng chi tiêu', pendingTotalSpend],[totalWorkingOn, 'Tổng công việc đang làm'],[totalWaiting, 'Tổng công việc đanng chờ làm'],[totalBuy, 'Tổng số công việc đã mua'],[totalJobSeek, 'Tổng số công việc đang tìm người làm']]}/>
                    </div>
                    <br></br>
                    <div>
                        <NoteBoard/>
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
                                padding-bottom: 1.5rem;
                            }
                            
                        }
                    }
                }
                `}

            </style>
        </div>
    )
}
export const getServerSideProps = async({req}) => {
    const session = await getSession({ req });

    const res1 = await fetch(`${process.env.API_URL}/jobs?profile.user=${session.id}`);
    const freelancerJobs = await res1.json();

    const res2 = await fetch(`${process.env.API_URL}/job-seekers?profile.user=${session.id}`);
    const seekerJobs = await res2.json();

    const res3 = await fetch(`${process.env.API_URL}/transactions?seeker._id=${session.id}`,{
        headers: {
            "Authorization": `Bearer ${session.jwt}`
        }
    })
    const transactionSeeker =  await res3.json();

    const res4 = await fetch(`${process.env.API_URL}/transactions?freelancer._id=${session.id}`,{
        headers: {
            "Authorization": `Bearer ${session.jwt}`
        }
    })
    const transactionFreelancer = await res4.json();

    return {
        props: {
        session,
        freelancerJobs,
        seekerJobs,
        transactionSeeker,
        transactionFreelancer
        },
    };
}