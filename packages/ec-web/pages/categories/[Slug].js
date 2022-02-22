import Head from "next/dist/next-server/lib/head";
import Link from 'next/link';
import { API_URL } from "../../utils/urls";
import { BigJob } from '../../components/JobCard'

const Category = (props) => {
    const temp = {"jobs" : []};
    for(var i of props.jobs){
        temp.jobs.push(i);
    }
    
    return (
        <div className='content-container'>
            <Head>
                {
                    props.category.meta_title &&
                        <title>{props.category.meta_title}</title>
                }
                {
                    props.category.meta_desc &&
                        <meta name='desc' content={props.category.meta_desc}></meta>
                }
            </Head>
            <div className='banner-container' >
                <div className='title'>{props.category.name}</div>
                <div className='title-desc'>{props.category.desc}</div>
            </div>
            <div className='content-container'>
                <div className='card-container'>
                { 
                    temp.jobs.map(job => <BigJob job={job} key={job._id}></BigJob>)
                }
                </div>
            </div>
            <div>
                
            </div>
                <style jsx>
                    {`
                    .container{
                        width: 100%;
                    }
                    .banner-container{
                        text-align: center;
                        margin-bottom: 5%;
                        .title{
                            font-size: 2.5rem;
                            font-weight: 700;
                        }
                        .title-desc{
                            font-size: 1rem;
                            font-weight: 400;
                        }
                        
                    }
                    .content-container{
                            margin: auto;
                            width: 100%;
                            .card-container{
                                width: 80%;
                                margin: auto;
                                display: grid;
                                grid-template-columns: 1fr 1fr 1fr;
                                grid-template-rows: auto;
                                items-align: center;
                            }
                        }
                    `}
                </style>
        </div>
    )
}

export async function getStaticProps({ params: { Slug } }) {
     const category_res = await fetch(`${API_URL}/categories/?Slug=${Slug}`);
     const found = await category_res.json();

     const categoryId = found[0]._id;
     const jobs_res = await fetch(`${API_URL}/jobs/?category=${categoryId}`);
     const jobs_found = await jobs_res.json();

     return {
         props: {
            category: found[0],
            jobs: jobs_found
         }
     }

    }



export async function getStaticPaths() {
    //Retrive all the possible paths
    const categories_res = await fetch(`${API_URL}/categories`);
    const categories = await categories_res.json();

    const paths = categories.map(category => {
        return {
            params: {
                Slug: String(category.Slug)
            }
        }
    })
    
    //Return them to NextJS context
    return {
        paths,
        fallback: false
    }
}

export default Category;