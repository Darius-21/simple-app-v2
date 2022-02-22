import React from 'react';
import urlImage from 'D:/Uit/HK4/Web/simple-app/packages/ec-web/public/LamThanhTin_image.jpg'

import PropTypes from 'prop-types';
import { Button } from '../Button';


export const UserShow = (props) => { const { Name, UserType, PicSrc } = props
    return (
        <div className="u-layout">
        <div className="u-layout-row">
          <div className="u-container-style u-layout-cell u-size-1-md u-size-1-sm u-size-1-xs u-size-15-lg u-size-21-xl u-layout-cell-4">
            <div className="u-container-layout u-valign-top-lg u-valign-top-xl u-container-layout-5">
              <div className="u-align-center u-hidden-xs u-image u-image-circle u-image-1" alt="" data-image-width={1536} data-image-height={1541} />
            </div>
          </div>
          <div className="u-align-center-md u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-size-39-xl u-size-45-lg u-size-59-md u-size-59-sm u-size-59-xs u-layout-cell-5">
            <div className="u-container-layout u-container-layout-6">
              <h4 className="u-hidden-xs u-text u-text-black u-text-3">{Name}</h4>
              <Button label={UserType} primary='true'/>
            </div>
          </div>
        </div>
        <style jsx>
          {`
          .u-layout-cell-4 {
              min-height: 120px;
          }

          .u-layout-cell-5 {
              min-height: 120px;
          }

          .u-container-layout-6 {
              padding: 30px 16px 0 0;
          }

          .u-text-3 {
              font-size: 1.5rem;
              margin: 0 -8px 0 8px;
          }

          @media (max-width: 1199px) {
              .u-layout-cell-4 {
                  min-height: 118px;
              }

              .u-text-3 {
                  font-size: 1.125rem;
              }

              .u-layout-cell-5 {
                  min-height: 118px;
              }
              
              .u-image-1 {
                  height: 38px;
                  width: 38px;
                  margin-left: 19px;
              }
          }

          @media (max-width: 991px) {
              .u-layout-cell-4 {
                  min-height: 110px;
              }

              .u-container-layout-6 {
                  padding-top: 15px;
                  padding-right: 0;
              }

              .u-layout-cell-5 {
                  min-height: 100px;
              }

              .u-text-3 {
                  width: auto;
                  margin-left: 1px;
                  margin-right: 1px;
              }

              .u-image-1 {
                  height: 86px;
                  width: 86px;
                  margin-top: -93px;
                  margin-right: -128px;
                  margin-left: auto;
              }
          }

          @media (max-width: 767px) {
              .u-layout-cell-4 {
                  min-height: 68px;
              }

              .u-container-layout-6 {
                  padding-top: 0;
              }

              .u-text-3 {
                  margin-top: -1176px;
              }

              .u-image-1 {
                  height: 158px;
                  width: 158px;
                  margin-top: -1282px;
                  margin-right: auto;
              }
          }

          @media (max-width: 575px) {
              .u-layout-cell-4 {
                  min-height: 43px;
              }

              .u-text-3 {
                  margin-top: -1043px;
              }

              .u-image-1 {
                  margin-top: -131px;
              }
          }

          .u-image-1 {
              height: 69px;
              width: 69px;
              background-image: url("D:/Uit/HK4/Web/simple-app/packages/ec-web/public/LamThanhTin_image.jpg");
              background-position: 50% 50%;
              margin: 0 auto;
          }`}
        </style>
      </div>
    )
};

UserShow.propTypes = {
    Name: PropTypes.string,
    UserType: PropTypes.string,
    PicSrc: PropTypes.string,
};

UserShow.defaultProps = {
    Name: 'User name',
    UserType: 'SELLER',
    PicSrc: '#',
}
