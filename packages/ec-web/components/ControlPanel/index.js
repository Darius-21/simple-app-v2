import React from 'react';

import PropTypes from 'prop-types';
import { FlatButton, FlatButtonIndexed, Button } from '../Button';

import { UserShow } from '../UserShow';

export const ControlPanel = (props) => { const { } = props
    return (
        <div className="u-size-16-lg u-size-16-md u-size-16-sm u-size-16-xs u-size-18-xl">
            <div className="u-layout-col">
              <div className="u-align-left u-container-style u-layout-cell u-radius-10 u-shape-round u-size-60 u-white u-layout-cell-1">
                <div className="u-container-layout u-valign-bottom-md u-valign-bottom-sm u-valign-bottom-xs u-container-layout-1">
                <UserShow Name='Lâm Thành Tín' UserType='Administrator'/>
                  <div className="u-container-style u-expanded-width-lg u-expanded-width-sm u-expanded-width-xs u-group u-group-1">
                    <div className="u-container-layout">
                        <FlatButtonIndexed label='DASHBOARD'/>
                        <FlatButton Label='My profile'/>
                        <FlatButton label='Message'/>
                        <FlatButton label='Job Manager'/>
                    </div>
                  </div>
                  <Button label='Log out'/>
                </div>
              </div>
            </div>
        </div>
    )
};
