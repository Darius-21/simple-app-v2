import React from 'react'

export default function forgotPassword() {
    return (
        <div className='body'>
            <div className='title'>Quên mật khẩu</div>
            <div className='form-body'>
                <form>
                    <div className='form-group'>
                        <label>Hãy điền email đăng ký tài khoản của bạn</label>
                        <input className='form-control' type='email' placeholder='Nhập email của bạn'></input>
                    </div>
                    <div className='form-group'>
                    <button type='button' className='btn btn-outline-danger'>Gửi mail cho tôi ngay</button>
                    </div>
                </form>
            </div>
            <style jsx>
                {`
                .body{
                    width: 100%;
                }
                .title{
                    text-align: center;
                    font-size: 3rem;
                    margin: 5% 0px;
                    color: var(--main-color);
                }
                .form-body{
                    margin-right: auto;
                    margin-left: auto;
                    width: 60%;
                    background-color: var(--main-color);
                    color: white;
                    padding: 5% 5%;
                    border-radius: 10px;
                    .form-group{
                        label, input{
                            margin-bottom: 5%;
                        }
                    }
                }
                `}
            </style>
        </div>
    )
}
