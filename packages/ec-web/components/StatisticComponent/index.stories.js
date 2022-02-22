import React from 'react';

import { StatisticCPN } from '.';

export default {
  title: 'components/StatisticComponent',
  component: StatisticCPN,
};

const Template = (args) => <StatisticCPN {...args} />;

export const ExStatistic = Template.bind({});
ExStatistic.args = {
    Solieu: '232',
    Mota: 'Đơn hàng trong tháng này',
};