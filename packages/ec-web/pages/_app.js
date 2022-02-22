import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "swiper/components/pagination/pagination.min.css";
import "@fortawesome/react-fontawesome"
import 'swiper/swiper.scss';
import App from 'next/app';
import React, { createContext } from 'react';
import Header from '../../ec-web/components/Header';
import Footer from '../../ec-web/components/Footer';
import Head from 'next/head';
import { useTheme, ThemeProvider, withTheme } from '@emotion/react'
import fetch from 'isomorphic-unfetch'
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config'
import Router from 'next/router'
import { parseCookies } from "nookies";
import nookies from "nookies";
import ContextWrapper from "../context/ContextWrapper";
import NProgress from 'nprogress'
import "nprogress/nprogress.css"
import dynamic from 'next/dynamic'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';


const TopProgressBar = dynamic(
  () => {
    return import("components/TopProgressBar");
  },
  { ssr: false },
);
const theme = {
  breakpoints: [
    '40em', '52em', '64em',
  ],
  colors: {
    primary: 'rgb(225,126,166)',
    secondary: "#FBD2D7",
    text: '#000',
  },
  space: [
    0, 4, 8, 16, 32, 64, 128, 256,
  ],
}

export const GlobalContext = createContext({});

export default function MyApp({ Component, pageProps, categoriesItems, userId, jwt, userProfile}) {
  const { global } = pageProps;
  return (
    <>
      <DefaultSeo {...SEO}/>
      <ThemeProvider theme={theme}>
        
        <div className="grid-container">
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,300;1,400;1,900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/> 
            <link rel="stylesheet" type="text/css" href="/nprogress.css" />
          </Head>
          <GlobalContext.Provider value={global}>
            <ContextWrapper categoriesItems={categoriesItems} userId={userId} jwt={jwt} userProfile={userProfile}>
              <Header/>
              <TopProgressBar/>
              <Component {...pageProps} />
              <Footer />
            </ContextWrapper>
          </GlobalContext.Provider>
        </div>
      </ThemeProvider>

    </>
  );
}



MyApp.getInitialProps = async ({ Component, ctx}) => {
  const { API_URL } = process.env;

  const jwt =  nookies.get(ctx).jwt;
  const userId = nookies.get(ctx).user;

  const res = await fetch(`${API_URL}/categories`);
  const categoriesItems = await res.json();

  const res2 = await fetch(`${API_URL}/profiles/?user._id=${userId}`)
  const userProfile = await res2.json();


  const pageProps = await App.getInitialProps({Component, ctx});

  if(!jwt) {
    //Implement redirect on users and admin page if not have token
  }

  return { 
    pageProps,
    categoriesItems,
    jwt, userId, userProfile
  }
}