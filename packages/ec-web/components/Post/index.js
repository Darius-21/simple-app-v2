import React from 'react'

export default function PostCard({ post }) {
    const { API_URL } = process.env;
    return (
        <div key = {post._id} className='card'>
            <a href = { `/posts/${post._id}`}>
                <img className='card-img-top' src={API_URL+ post.coverImage.url} alt={post.title} height='100px' width='auto'/>
                <div className='card-body'>
                    <h5 className='card-title'>{post.title}</h5>
                    <div>Written by: {post.author}</div>
                    <div className='card-text'>{post.body.substring(0,50) + '...'}</div>
                    <div className='read-more'>Read more</div>
                </div>

            </a>
            <style jsx>
                {`
                .card{
                    display: block;
                    height: auto;
                    margin: 2%;
                    width: 20rem;
                    > a{
                        text-decoration: none;
                        color: black;
                        
                    }
                    .card-title{
                            font-size: 1.5rem;
                            font-weight: 700;
                            color: var(--main-color);
                        }
                }
                .read-more{
                    display: inline;
                    color: grey;
                    :hover{
                        color: black;

                    }
                }
                `}
            </style>
        </div>
    )
}
