import React from 'react'
import Link from 'next/link'
import AuthContext from '../../../context/AuthContext'
import { useContext } from 'react'


export default function index() {
    return (
        <div className='container'>
            <div className='title'>Quản lý công việc</div>
            <div className='small-title'><Link href='/users/jobs/myJobs'><a>Công việc của tôi</a></Link></div>
            <div className='details'>Đây là nơi để bạn tìm kiếm, xem xét và chỉnh sửa những công việc đã đăng của mình. Hãy đảm bảo bài viết cũng như là công việc mà bạn đăng chất lượng nhé, đó sẽ là một phần làm nên danh tiếng của bạn ấy.</div>
            <div className='small-title'><Link href='/users/jobs/createJobs'><a>Tạo công việc cho Freelancer</a></Link></div>
            <div className='details'>Để có thể tạo công việc mới và quảng bá bản thân, bạn hãy điền đầy đủ những thông tin cần thiết như tên, ngày sinh, giới tính, công việc và những kỹ năng mình có nhé. </div>
            <div className='small-title'><Link href='/users/jobs/createJobsSeeker'><a>Tạo công việc tìm người làm cho Seeker</a></Link></div>
            <div className='details'>Bạn đang có một ý tưởng, một dự án, một mối quan tâm nào đó mà không thể tự thực hiện? Đừng lo, Simple sẽ hỗ trợ bạn tìm người nhé. Tạo công việc ngay hôm nay thôi!</div>
            <div className='small-title'><Link href='/users/jobs/workingOn'><a>Công việc đang làm</a></Link></div>
            <div className='details'>Đây sẽ là nơi quản lý những công việc mà bạn đang làm, hãy nhớ cập nhật trạng thái thường xuyên nhé, không thì chúng tôi sẽ hủy đơn nếu bạn không nộp đúng hạn đấy.</div>
            <div className='small-title'><Link href='/users/jobs/waitingJobs'><a>Công việc đang chờ</a></Link></div>
            <div className='details'>Tik tok tik tok đơn hàng mới đã đến đây, hãy vào chấp nhận đi nhé.</div>
            <div className='small-title'><Link href='/users/jobs/myFavorite'><a>Công việc yêu thích</a></Link></div>
            <div className='details'>Yêu thích một công việc? Đây là nơi lưu trữ những gì mà bạn quan tâm.</div>
            <div className='small-title'><Link href='/users/jobs/jobsSeekWaiting'><a>Công việc đang chờ người xét</a></Link></div>
            <div className='details'>Nơi quản lý những đơn hàng mà bạn đã mua và đang đợi được chấp nhận</div>
            <div className='small-title'><Link href='/users/myTransactions'><a>Đơn hàng của bạn</a></Link></div>
            <div className='details'>Nơi quản lý những đơn hàng mà bạn đã mua, nếu như có trạng thái cập nhật thì chúng tôi sẽ báo ngay nhé! Đây cũng là nơi quản lý những đơn hàng bạn đã đang hoặc chưa làm xong đấy.</div>
            <style jsx>
                {`
                .small-title{
                    a{
                        text-decoration: none;
                        color: var(--main-color);
                        font-size: 2rem;
                        font-weight: bold;
                        
                    }
                    
                    margin-top: 2%;
                    margin-bottom: 2%;
                }
                .details{
                        font-size: 1.3rem;     
                }
                `}
            </style>
        </div>
    )
}
