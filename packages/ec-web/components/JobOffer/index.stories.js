import React from 'react'

import JobOffer from '.'

export default {
    title: 'components/JobOffer',
    components: JobOffer,
}

const Template = (args) => <JobOffer {...args}></JobOffer>

export const Form = Template.bind({})
Form.args = {
    name: 'default-form',
    action: 'get',
    method: '#',
}