import React from 'react'
import axios from 'axios'
import StrapiClient from '../../lib/strapi-client'
import Card from '../../components/categoryCard'

const client = new StrapiClient()
export const getStaticProps = async () => {
    const lists = await client.fetchData('/navigation');
    return {
        props: {
            data: lists
        }
    }
}

export default function categories({ data }) {
    return (
        <div className='body'>
            <div className='title'>Categories</div>
            <div className='container'>
            {
                (data.categories).map(card => (
                    <Card key={card._id} props={card} className='one-card'/>
                ))
            }
            </div>
            <style jsx>
                {`
                    .title{
                        font-size: 3rem;
                        text-align: center;
                        padding-bottom: 50px;
                    }
                    .container{
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        items-align: center;
                        margin-left: auto;
                        margin-right: auto;
                        .one-card{
                            margin-bottom: 10px;
                        }
                    }
                    
                `}
            </style>
        </div>
    )
}
