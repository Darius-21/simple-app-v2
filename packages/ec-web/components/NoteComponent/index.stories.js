import React from 'react';

import { NoteCPN } from '.';

export default {
  title: 'components/NoteComponent',
  component: NoteCPN,
};

const Template = (args) => <NoteCPN {...args} />;

export const ExNote = Template.bind({});
ExNote.args = {
  Headline:'Cần cập nhật công việc đầu tiên trước cuối tuần',
  Content:'Chỉnh sửa công việc đầu tiên cho phù hợp với tình hình hiện tại để tối ưu năng suất làm việc và cải thiện chất lượng mang lại cho khách hàng.',
};