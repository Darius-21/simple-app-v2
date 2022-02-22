import React from 'react';


import PropTypes from 'prop-types';

import {StatisticCPN} from '../StatisticComponent';

export default function StatisticBoard(props){
    return(
        <div className="u-clearfix u-expanded-width-sm u-expanded-width-xs u-gutter-12">
            <div className="u-layout">
                <div className="u-layout-row">
                    {
                        props.statistic.map(card => (
                            <StatisticCPN Solieu={card[0]} Mota={card[1]} textcolor2='#465f60' pending={card[2] ? card[2] : null}/>
                        ))
                    }
                </div>
            </div>
      </div>
    )
};