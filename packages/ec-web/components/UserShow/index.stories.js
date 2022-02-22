import React from 'react';

import { UserShow } from '.';

export default {
  title: 'components/UserShow',
  component: UserShow,
};

const Template = (args) => <UserShow {...args} />;

export const UserShowDemo = Template.bind({});
UserShowDemo.args = {
    Name: 'Lâm Thành Tín',
    UserType: 'Admin',
};