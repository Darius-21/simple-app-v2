import React from 'react';

import PropTypes from 'prop-types';


export const NoteCPN = (props) => { const { Headline, DayTime, Content } = props
    return (
        <div className="u-align-left-xs u-blog-post u-container-style u-radius-10 u-repeater-item u-shape-round u-white u-repeater-item-1">
              <div className="u-container-layout u-similar-container u-valign-top-lg u-valign-top-md u-valign-top-sm u-valign-top-xs u-container-layout-1">
                <h4 className="u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-blog-control u-text u-text-2">
                  <a className="u-post-header-link">{Headline}</a>
                </h4>
                <div className="u-blog-control u-metadata u-text-grey-40 u-metadata-1">
                  <span className="u-meta-date u-meta-icon">{DayTime}</span>
                  <span className="u-meta-edit u-meta-icon">Edit</span>
                </div>
                <p className="u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-blog-control u-post-content u-text u-text-3">{Content}</p>
            </div>
            <style jsx>
              {`
              
              .u-container-layout-1 {
                  padding: 30px 30px 30px 30px;
                  margin: 10px 10px 10px 10px;
              }

              .u-text-2 {
                  font-weight: 600;
                  font-size: 1.875rem;
                  margin: 10px 10px 10px 10px;
              }

              .u-metadata-1 {
                  font-size: 0.875rem;
                  margin: 12px auto 0 0;
              }

              @media (max-width: 1199px) {
                  .u-metadata-1 {
                      width: auto;
                  }

                  .u-container-layout-1 {
                      padding-left: 10px;
                      padding-right: 10px;
                  }

                  .u-text-2 {
                      width: auto;
                  }

                  .u-repeater-1 {
                      grid-template-columns: repeat(2, calc(50% - 11px));
                      min-height: 503px;
                  }
              }

              @media (max-width: 991px) {
                  .u-repeater-1 {
                      grid-auto-columns: calc(100% - 0px);
                      grid-template-columns: 100%;
                      grid-auto-rows: calc(25% - 16.5px);
                  }
              }

              @media (max-width: 767px) {
                  .u-repeater-1 {
                      grid-auto-columns: 100%;
                  }
              }`}
            </style>
        </div>
    )
};

NoteCPN.propTypes = {
    Headline: PropTypes.string.isRequired,
    DayTime: PropTypes.string,
    Content: PropTypes.string,
    onClick: PropTypes.func,
};

NoteCPN.defaultProps = {
    onClick: undefined,
    DayTime: '31/05/2021',
    Content: 'Click to edit note...',
}
