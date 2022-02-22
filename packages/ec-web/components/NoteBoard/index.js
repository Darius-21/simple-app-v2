import React from 'react';

import PropTypes from 'prop-types';

import {NoteCPN} from '../NoteComponent';

export default function NoteBoard({}){
    return(
        <div class="u-blog u-expanded-width u-blog-1">
            <div class="u-repeater u-repeater-1">
                <NoteCPN Headline='Cần cập nhật công việc đầu tiên trước cuối tuần' Content='Chỉnh sửa công việc đầu tiên cho phù hợp với tình hình hiện tại để tối ưu năng suất làm việc và cải thiện chất lượng mang lại cho khách hàng.'/>
                <NoteCPN Headline="Example note 1"/>
                <NoteCPN Headline="Example note 2"/>
            </div>
        </div>
    )
}