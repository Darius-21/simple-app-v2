import React from 'react';


import PropTypes from 'prop-types';
import { Button } from '../Button';

export default function FindForm({}){
    return(
        <div className="u-form u-form-1">
        <form action="#" method="POST" className="u-clearfix u-form-horizontal u-form-spacing-15 u-inner-form" style={{padding: '15px'}} source="custom">
          <div className="u-form-group u-form-name">
            <input type="text" placeholder="Nhập việc cần tìm..." id="name-558c" name="find" className="u-border-1 u-border-white u-custom-font u-font-raleway u-input u-input-rectangle u-radius-10 u-white u-input-1" required />
          </div>
          <div className="u-form-group u-form-submit">
            <Button primary='true' label='TÌM VIỆC'/>
            <input type="submit" defaultValue="submit" className="u-form-control-hidden" />
          </div>
          <div className="u-form-send-message u-form-send-success">Thank you! Your message has been sent.</div>
          <div className="u-form-send-error u-form-send-message">Unable to send your message. Please fix errors then try again.</div>
          <input type="hidden" defaultValue name="recaptchaResponse" />
        </form>
        <style jsx>
          {`
          .u-form-1 {
              height: 90px;
              width: 929px;
              margin: 137px auto 60px;
          }

          .u-input-1 {
              background-image: none;
              font-weight: 600;
              font-size: 1.25rem;
          }

          .u-btn-1 {
              border-style: none;
              background-image: none;
              font-weight: 600;
              font-size: 1.4375rem;
          }

          @media (max-width: 1199px) {
              .u-text-1 {
                margin-left: 0;
                margin-right: 0;
              }
            }
            
            @media (max-width: 991px) {
              .u-form-1 {
                width: 720px;
              }
            }
            
            @media (max-width: 767px) {
              .u-text-1 {
                font-size: 3.75rem;
              }
            
              .u-form-1 {
                width: 540px;
              }
            }
            
            @media (max-width: 575px) {
              .u-text-1 {
                font-size: 3rem;
              }
            
              .u-form-1 {
                width: 340px;
              }
          }
          `}
        </style>
      </div>
    )
}