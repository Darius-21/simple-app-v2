import React from 'react';

import PropTypes from 'prop-types';
import { Button } from '../Button';

export default function Tittle({tittle}){
    return(
        <div>
            <h1 className="u-align-center u-custom-font u-font-raleway u-text u-title u-text-1">
            {tittle}
            </h1>
            <style jsx>
                {
                    `
                .u-text-1 {
                    font-weight: 600;
                    font-size: 4rem;
                    margin: 282px -80px 0;
                }

                @media (max-width: 1199px) {
                    .u-text-1 {
                    margin-left: 0;
                    margin-right: 0;
                    }
                }

                @media (max-width: 767px) {
                    .u-text-1 {
                    font-size: 3.75rem;
                    }
                }

                @media (max-width: 575px) {
                    .u-text-1 {
                    font-size: 3rem;
                    }
                }`
                }
            </style>
        </div>
    )
}

Tittle.propTypes = {
    tittle: PropTypes.string,
  };
  
Tittle.defaultProps = {
    tittle: 'Chỉnh sửa tittle...',
};