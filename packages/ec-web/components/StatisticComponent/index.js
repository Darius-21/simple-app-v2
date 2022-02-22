import React from 'react';

import PropTypes from 'prop-types';


export const StatisticCPN = (props) => { const { Solieu, Mota, textcolor1, textcolor2, BGColor, pending } = props
    return (
        <div className="u-container-style u-layout-cell u-radius-10 u-shape-round u-size-15 u-size-30-md u-layout-cell-6" ref={(el) => { if (el) {el.style.setProperty('background-color', BGColor, 'important')}}}>
            <div className="u-container-layout u-container-layout-7">
                <h4 className="u-align-center-sm u-align-center-xs u-text u-text-default u-text-4" style={{color:textcolor1}}>{Solieu}</h4>
                { props.pending ? <h6 className="u-align-center-sm u-align-center-xs u-text u-text-5" style={{color:textcolor1}}>Đang chờ: {pending}</h6> : <div></div>}
                <h5 className="u-align-center-sm u-align-center-xs u-text u-text-5" style={{color:textcolor2}}>{Mota}</h5>
            </div>
            <style jsx>
                {`
                .u-layout-cell-6 {
                    min-height: 217px;
                    background-image: none;
                }

                .u-container-layout-7 {
                    text-align: center;
                    box-shadow: 2px 2px 14px 0 rgba(128,128,128,0.3);
                    padding: 30px;
                }

                .u-text-4 {
                    margin-top: 0;
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 0;
                }

                .u-text-4 {
                    font-size: 2.25rem;
                }

                .u-text-4 {
                    font-size: 3rem;
                    width: auto;
                    margin-left: auto;
                    margin-right: auto;
                }

                .u-text-5 {
                    margin-left: 0;
                    margin-right: 2px;
                    margin-top: 20px;
                }

                .u-text-5 {
                    margin: 21px auto 0;
                }

                `}
            </style>
        </div>
    )
};

StatisticCPN.propTypes = {
    Solieu: PropTypes.string,
    Mota: PropTypes.string,
    textcolor1: PropTypes.string,
    textcolor2: PropTypes.string,
    BGColor: PropTypes.string,
    onClick: PropTypes.func,
};

StatisticCPN.defaultProps = {
    onClick: undefined,
    Solieu: '0',
    Mota: 'Nhập mô tả...',
    textcolor1: 'white',
    textcolor2: '#654a55',
    BGColor: '#e892b4',
}
