import React from 'react'

export default function Card( { props } ) {
    const { API_URL } = process.env;
    return (
        <div className='big-card' key={props._id}>
            <div>
                <div className='name'>{props.name}</div>
                <div className='desc'>{props.desc}</div>
            </div>
            <div className='image'>
                <img src={API_URL +props.img.url} alt={props.name} height='350px' width= 'auto'/>
            </div>
            <style jsx>
                {`
                    .big-card{
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        .name{
                            font-size: 2rem;
                            font-weight: 600;

                        }
                        .desc{
                            font-size: .75rem;
                            font-weight: 300;
                        }
                        .image{
                            items-align: center;
                            text-align: center;
                        }
                        margin: 2%;
                    }
                `}
            </style>
        </div>
    )
}
