import React from 'react';


import PropTypes from 'prop-types';

import { InformationPanel } from '../InformationPanel';
import { Primary } from '../Button';

export const RecentActivites_CPN = (props) => { const { Tittle } = props
    return (
        <div className="u-container-style u-layout-cell u-radius-10 u-shape-round u-size-30 u-white u-layout-cell-3">
            <div className="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-container-layout-4">
                <h4 className="u-text u-text-default-lg u-text-default-md u-text-default-sm u-text-default-xl u-text-2">{Tittle}</h4>
                <div className="u-align-center u-expanded-width-sm u-expanded-width-xs u-table u-table-responsive u-table-1">
                    <table className="u-table-entity">
                        <tbody className="u-table-body">
                            <InformationPanel/>
                            <InformationPanel Mota='Jodie Farrell left 5* review for Real Estate Logo' DayTime='14 phút trước'/>
                            <InformationPanel Mota='Your Magento Developer job expired' DayTime='4 ngày trước'/>
                            <InformationPanel Mota='Ethan Barrett left a 5* review on New Logo' DayTime='22/05/2021 13:21'/>
                            <InformationPanel Mota='Albert Dua send you a message' DayTime='20/05/2021 10:32'/>
                        </tbody>
                    </table>
                </div>
                <a href="#" className="u-align-center-xs u-align-right-lg u-align-right-md u-align-right-sm u-align-right-xl u-btn u-btn-round u-button-style u-hover-palette-1-light-1 u-palette-1-base u-radius-6 u-btn-15">
                XEM THÊM
                </a>
            </div>
            <style jsx>
                {`
                .u-container-layout-4 {
                    box-shadow: 2px 2px 14px 0 rgba(128,128,128,0.3);
                    padding: 29px 0 30px;
                }

                .u-layout-cell-3 {
                    min-height: 448px;
                }

                .u-text-2 {
                    font-size: 2.25rem;
                    padding: 0px 20px 20px 20px;
                }

                .u-btn-15 {
                    border-style: none;
                    font-weight: 700;
                    font-size: 0.9375rem;
                    margin: 18px 30px 0 auto;
                    padding: 8px 33px;
                }

                @media (max-width: 1199px) {
                    .u-section-1 .u-btn-15 {
                        margin-top: 15px;
                        margin-right: 44px;
                    }
                }

                @media (max-width: 991px) {
                    .u-section-1 .u-btn-15 {
                        margin-right: 31px;
                    }
                }

                @media (max-width: 767px) {
                    .u-section-1 .u-btn-15 {
                        margin-top: 11px;
                        margin-right: 30px;
                    }
                }

                @media (max-width: 575px) {
                    .u-section-1 .u-btn-15 {
                        margin-right: auto;
                    }
                }`}
            </style>
      </div>
    )
};

RecentActivites_CPN.propTypes = {
    Tittle: PropTypes.string,
    onClick: PropTypes.func,
};

RecentActivites_CPN.defaultProps = {
    onClick: undefined,
    Tittle: 'Chỉnh sửa tiêu đề...'
}
