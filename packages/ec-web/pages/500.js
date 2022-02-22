import React from 'react'

export default function Custom500(props) {
    return (
        <div>
            <h1 className='center red err'>500 - Internal Server Error</h1>
            <p className='center'>Please try to reload the page later</p>
            <p className='center'>Sorry for your inconvenient</p>
            <style jsx>
                {`.center{
                    text-align: center;
                }
                .red{
                    color: red
                }
                .err {
                    font-weight: 900;
                    font-family: Raleway;
                }
                p.center{
                    color: pink;
                }
                `}
            </style>
        </div>
    )
}
