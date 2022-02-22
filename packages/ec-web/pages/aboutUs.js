import React from 'react'
import axios from 'axios'
import StrapiClient from '../lib/strapi-client'
import Card from '../components/aboutUsCard'

const client = new StrapiClient()
export const getStaticProps = async () => {
    const posts = await client.fetchData('/about-us');
    return {
        props: {
            developers: posts
        }
    }
}

export default function aboutUs({ developers }) {
    return (
        <div className='body'>
            <div className='title'>Who are We?</div>
            {
                developers.developersDetails.map(developer => (
                    <Card key={developer._id} props={developer}/>
                ))
            }
            <style jsx>
                {`
                    .title{
                        font-size: 3rem;
                        text-align: center;
                    }
                    
                `}
            </style>
        </div>
    )
}
