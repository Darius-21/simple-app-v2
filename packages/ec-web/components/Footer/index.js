import React from 'react';

import { FooterCPN } from '../FooterComponent';

export default function Footer({}) {
    return (
        <footer className="u-align-center u-clearfix u-custom-color-5 u-footer u-footer" id="sec-3e2f"><div className="u-container-style u-expanded-width u-gradient u-group u-group-1">
        <div className="u-container-layout u-container-layout-1" />
          </div>
        <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
          <div className="u-layout">
            <div className="u-layout-row">
              <FooterCPN mode='true' tieude='Categories' link_name1='Graphic & Design' link1='/graphics-and-design' link_name2='Lifestyle' link2='lifestyle' link_name3='Music & Audio' link3='/music-and-audio' link_name4='Programing & tech' link4='programming-and-tech' link_name5='Proofing & translation' link5='/proofing-and-translation'/>
              <FooterCPN mode='true' tieude='For Clients' link_name1='How to hire?' link2='/talent' link_name2='Talent Marketplace' link_name3='Payroll Service' link_name4="Talent Scout" link_name5='Leave a message' link5='/customerService'/>
              <FooterCPN mode='true' tieude='For Talents' link_name1='How to become a seller?' link_name2='How to make an impression?' link_name3='Blog Area' link3='/posts' link_name4='Support Group' link4='https://www.facebook.com/Wabisabi2k1'/>
              <FooterCPN mode='false' tieude='Follow Us' link_name1='Facebook' link_name3='Twitter' link_name5='Instagram' link1='https://www.facebook.com/Wabisabi2k1' link3='https://twitter.com/Wabisab91536409' link5='https://www.instagram.com/nhuwlaftooi/'/>
            </div>
          </div>
        </div>
        <p className="u-align-center-sm u-align-center-xs u-custom-font u-heading-font u-small-text u-text u-text-custom-color-15 u-text-variant u-text-5">© 2021 Simple. All Rights Reserved.</p>

        <style jsx>
          {`
          footer{
            margin-top: 5%;
          }
          
          `}
        </style>
      </footer>
    )
};

