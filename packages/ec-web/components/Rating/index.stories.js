import React from 'react';

import Rating from '.';

export default {
  title: 'components/Rating',
  component: Rating,
};

const Template = (args) => <Rating {...args}></Rating>;

export const TestRating = Template.bind({})

TestRating.args ={
  numReviews: 2,
  rating: 4
}


