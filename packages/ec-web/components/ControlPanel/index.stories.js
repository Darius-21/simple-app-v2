import React from 'react';

import { ControlPanel } from '.';

export default {
  title: 'components/ControlPanel',
  component: ControlPanel,
};

const Template = (args) => <ControlPanel {...args} />;

export const ControlPanelDemo = Template.bind({});
ControlPanelDemo.args = {
};