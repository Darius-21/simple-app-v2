import StrapiClient from '../lib/strapi-client';
import Head from 'next/head';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper';
import FreelancerCard from '../components/FreelancerCard';
import { API_URL } from '../utils/urls'
import JobCard from '../components/JobCard/index.js';
import { Carousel } from 'react-bootstrap'
import Link from 'next/link'


const client = new StrapiClient()

export const getStaticProps = async () => {
    const categories_res = await fetch(`${API_URL}/categories`);
    const lists = await categories_res.json();

    const results_res = await fetch(`${API_URL}/profiles/`);
    const results = await results_res.json();
    const jobs_res = await fetch(`${API_URL}/jobs/`);
    const jobs = await jobs_res.json();
    
    return {
        props: {
            profiles: results,
            data: lists,
            jobs: jobs,
        }
    }
}
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Controller]);


export default function Home(props) {
    const [controlledSwiper, setControlledSwiper] = useState(null);
    var profiles = {"profiles": []};
    for( var i of props.profiles){
        profiles.profiles.push(i);
    }
    var jobs = {"jobs": []};
    for( var i of props.jobs){
        jobs.jobs.push(i);
    }
    var categories = {"categories": []};
    for(var i of props.data){
        categories.categories.push(i);
    }
    const [keyword, setKeyword] = useState('');

    async function search(){

    }
    return (
        <div className="Container">
        
        <section className="u-clearfix u-custom-color-1 u-section-1" id="sec-9709" >

            <div className='title'>Chúng tôi cung cấp những tài năng bậc nhất. Tìm kiếm ngay!</div>
            <form className="input-group">
              <input type="text" className="form-control form-control-lg mb-2 rounded" placeholder="logo design" aria-label="logo design"
                aria-describedby="search-addon" onChange={e => setKeyword(e.target.value)} value={keyword}/>
              <Link href={`/search?keyword=${keyword}`}><button type="button" className="btn mb-2 btn-outline-danger" onClick={() => search()}>Tìm kiếm</button></Link>
            </form>
      </section>
      <section
        className="u-clearfix u-custom-color-6 u-section-2"
        id="sec-b0f3"
      >
        <div className='title'>Những phân loại được yêu thích</div>
        <div className="break"></div>
        <Carousel fade>
            {
                categories.categories.map((card) => (
                    <Carousel.Item>
                        <img src={API_URL + card.coverImg.url} 
                            className="d-block w-75 "
                            alt={card.name}
                        />
                        <Carousel.Caption>
                            <div className='d-block w-100 right bg-color'>
                                <h3 className='white'>{card.name}</h3>
                                <p className='white'>{card.desc}</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))
            }
        </Carousel>
      </section>

    <section
        className="u-clearfix u-custom-color-8 u-section-3"
        id="sec-3036"
      >
        <div className='title'>Những freelancer được yêu thích</div>
        <div className="break"></div>
        <Swiper
            spaceBetween={20}
            slidesPerView={5} spaceBetween={30} pagination={{
            "clickable": true}} 
            className='mySwipper'
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => <div></div>}
            onSwiper={(swiper) => <div></div>}
        >
            {
                profiles.profiles.map(card => (card.skills ? <SwiperSlide><FreelancerCard key={card._id} card={card} className='h-100' ></FreelancerCard></SwiperSlide> : <></>))
            }
            
        </Swiper>
    </section>
    <section
        className="u-clearfix u-custom-color-11 u-section-4"
        id='sec-3038'
      >
        <div className='title'>Những công việc mới</div>
        <div className="break"></div>
        <Swiper
            spaceBetween={30}
            direction='horizontal'
            slidesPerView={5} spaceBetween={30} pagination={{
            "clickable": true}} 
            className='mySwipper'
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => <div></div>}
            onSwiper={(swiper) => <div></div>}
        >
            {
                jobs.jobs.map(card =><SwiperSlide><JobCard key={jobs._id} job={card} className='one-card'></JobCard></SwiperSlide>)
            }
            
        </Swiper>
      </section>
        
    <style jsx>
        {`
            .Container{
                margin: -2% 0px 0px 0px;
            }
            .break{
                margin: 60px;
            }
            .right{
                text-align: right
            }
            .swiper-slide{
                height: auto;
            }
            .black{
                color: grey;
                font-weight: 700;
            }
            .white{
                color: white;
                font-weight: 700;
            }
            .title{
                text-align: center;
                font-size: 3.5rem;
                font-weight: 700;
                margin: 20px;
                display: block;
                padding: 10px;
                font-family: 'Montserrat';
                }
            #sec-9709{
                
                height: 800px;
                padding: 140px 10% 0 10%;
                padding-bottom: 5%;
                .input-group{
                width: 90%;
                margin-left: auto;
                margin-right: 7%;
                .form-control.rounded{
                    align-items: center;
                }
                .title{
                    font-weight: 900;
                }
                }
            }
            #sec-3036, #sec-3038, #sec-b0f3{
                padding: 5%;
            }
            #sec-3036, #sec-3038{
                height: 800px;
            }
            .bg-color{
                background-color: black;
                opacity: 50%;
                padding: 5%;
                border-radius: 10px;
            }
            #sec-b0f3{
                background-color: #f5f5f5;
            }
        `}
    </style>
    </div>
    )
  }
