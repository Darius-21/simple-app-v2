import React from 'react';

import { FooterCPN } from '.';

export default {
  title: 'components/FooterComponent',
  component: FooterCPN,
};

const Template = (args) => <FooterCPN {...args} />;

export const Categories = Template.bind({});
Categories.args = {
  type: true,
  tieude: 'Categories',
  link_name1: 'Graphic & design',
  link_name2: 'Lifestyle',
  link_name3: 'Gaming',
  link_name4: 'Programing & tech',
  link_name5: 'Writing & translation',
};

export const For_clients = Template.bind({});
For_clients.args = {
    type: true,
    tieude: 'For Clients',
    link_name1: 'How to hire?',
    link_name2: 'Talent Marketplace',
    link_name3: 'Payroll Service',
    link_name4: 'Talent Scout',
    link_name5: 'Leave a message',
};

export const For_talents = Template.bind({});
For_talents.args = {
    type: true,
    tieude: 'For Talents',
    link_name1: 'How to become a seller',
    link_name2: 'How to make an impression?',
    link_name3: 'Gaming',
    link_name4: 'Support Group',
}

export const Follow_us = Template.bind({});
Follow_us.args = {
    tieude: 'Follow Us',
    link_name1: 'Facebook',
    link_name3: 'Twitter',
    link_name5: 'Instagram',
}