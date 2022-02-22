import React from 'react'
import {Button} from 'react-bootstrap'
import Link from 'next/link'

export default function thankyou() {
    return (
        <div className='container'>
            <div className='big-title'>Thanks!</div>
            <div className='italic big'>We appreciated that you have used our services</div>
            <div className='normal-text italic'>Your order are in proceeded, we will let you know as soon as the Freelancer accept you order. You can see the status of your order in the Job Management page. In the mean time, you can browse around to look for more jobs that make you interested in or just posting a job to find someone you like to fullfill your need.</div>
            <div className='smaller-text'></div>
            <div className='normal-text'>If the Freelancer don't accept your Order, don't worry, we will return your money in 3-business-days (excluding Saturday and Sunday)</div>
            <Link href='/'><a><Button variant='danger'>Click here to return to our homepage.</Button></a></Link>
            <div className='big-title'>Cảm ơn!</div>
            <div className='italic big'>Chúng tôi rất vui khi được phục vụ bạn</div>
            <div className='normal-text italic'>Đơn của bạn đang được xử lý, chúng tôi sẽ báo ngay khi Freelancer chấp nhận đơn hàng của bạn. Bạn có thể xem tình trạng đơn hàng trong trang quản lý công việc. Trong thời gian chờ đợi, bạn có thể lướt xung quanh và tìm thêm những công việc mà bạn hứung thú, hoặc có thể là tự đăng một công việc nào đó để tìm một người phù hợp</div>
            <div className='smaller-text'></div>
            <div className='normal-text'>Còn nếu Freelancer không chấp nhận đơn hàng của bạn, đừng lo, chúng tôi sẽ trả tiền lại cho bạn trong vòng 3 ngày làm việc (trừ thứ 7 và Chủ Nhật)</div>
            <Link href='/'><a><Button variant='danger'>Bấm vào đây để quay lại trang chủ của chúng tôi</Button></a></Link>
            <style jsx>
                {`
                .container{
                    width: 60%;
                    text-align: center;
                    *{
                        margin: 3% 0px;
                    }
                    .big-title{
                        font-size: 5rem;
                        font-weight: 900;
                    }
                    .normal-text{
                        font-size: 1.2rem;
                    }
                    .big{
                        font-size: 1.8rem;
                    }
                    .italic{
                        font-style: italic
                    }
                    .italic.normal-text{
                        font-size: 1.2rem;
                    }
                }
                `}
            </style>
        </div>
    )
}
