import React from 'react';

import PropTypes from 'prop-types';


export const InformationPanel = (props) => { const { Mota, DayTime } = props
    return (
        <tr style={{height: '53px'}}>
            <td className="u-align-left u-border-2 u-border-grey-10 u-border-no-left u-border-no-right u-table-cell u-table-cell-1">
                {Mota} | {DayTime}
            </td>
        </tr>
    )
};

InformationPanel.propTypes = {
    Mota: PropTypes.string,
    DayTime: PropTypes.string,
    onClick: PropTypes.func,
};

InformationPanel.defaultProps = {
    onClick: undefined,
    DayTime: '5 phút trước',
    Mota: 'Your job for IOS Developer has been approved!',
}
