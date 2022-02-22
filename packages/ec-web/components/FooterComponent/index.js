import React from 'react';
import PropTypes from 'prop-types';



export const FooterCPN = (props) => { const {type, tieude, link_name1, link1, link_name2, link2, link_name3, link3, link_name4, link4, link_name5, link5} = props
    const mode = type ? 'big' : 'normal';
    return (
        <div className={['FooterCPN u-container-style u-layout-cell u-size-15 u-size-30-md u-layout-cell-1', mode].join(" ")}>
            <div className="u-container-layout u-valign-bottom-sm u-valign-bottom-xs u-valign-middle-lg u-valign-middle-xl u-container-layout-2">
                <div className="u-align-center u-container-style u-custom-color-18 u-group u-radius-24 u-shape-round u-group-2">
                    <div className="u-container-layout u-valign-top u-container-layout-3">
                      <h3 className="u-custom-font u-font-raleway u-text u-text-1">{tieude}</h3>
                      <a href={link1} className="u-active-none u-btn u-button-style u-custom-font u-font-raleway u-hover-none u-none u-text-active-grey-15 u-text-hover-grey-10 u-text-white u-btn-1">{link_name1}</a>
                      <a href={link2} className="u-active-none u-btn u-button-style u-custom-font u-font-raleway u-hover-none u-none u-text-active-grey-15 u-text-hover-grey-10 u-text-white u-btn-2">{link_name2}</a>
                      <a href={link3} className="u-active-none u-btn u-button-style u-custom-font u-font-raleway u-hover-none u-none u-text-active-grey-15 u-text-hover-grey-10 u-text-white u-btn-3">{link_name3}</a>
                      <a href={link4} className="u-active-none u-btn u-button-style u-custom-font u-font-raleway u-hover-none u-none u-text-active-grey-15 u-text-hover-grey-10 u-text-white u-btn-4">{link_name4}</a>
                      <a href={link5} className="u-active-none u-btn u-button-style u-custom-font u-font-raleway u-hover-none u-none u-text-active-grey-15 u-text-hover-grey-10 u-text-white u-btn-5">{link_name5}</a>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                .u-container-layout{
                    padding: 5% 5% 5% 5%;
                }
                .FooterCPN{
                    a{
                        font-family: Verdana Roboto sans-serif;
                        font-weight: 600;
                    }
                }
                `}
            </style>
        </div>
    )
};

FooterCPN.propTypes = {
    mode: PropTypes.string,
    tieude: PropTypes.string.isRequired,
    link_name1: PropTypes.string,
    link1: PropTypes.string,
    link_name2: PropTypes.string,
    link2: PropTypes.string,
    link_name3: PropTypes.string,
    link3: PropTypes.string,
    link_name4: PropTypes.string,
    link4: PropTypes.string,
    link_name5: PropTypes.string,
    link5: PropTypes.string,
    onClick: PropTypes.func,
};

FooterCPN.defaultProps = {
    onClick: undefined,
    link1: '#',
    link2: '#',
    link3: '#',
    link4: '#',
    link5: '#',
    mode: false,
    link_name1: '',
    link_name2: '',
    link_name3: '',
    link_name4: '',
    link_name5: '',
};

