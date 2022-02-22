import React from 'react';

import Tittle from '.';

export default {
  title: 'components/Tittle',
  component: Tittle,
};

const Template = (args) => <Tittle {...args} />;

export const TittleShow = Template.bind({});
Tittle.args = {
    tittle: 'Việc làm cập nhật hàng ngày,<br />tìm việc ngay!',
}