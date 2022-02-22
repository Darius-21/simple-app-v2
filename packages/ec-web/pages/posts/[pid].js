import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/router';

import StrapiClient from '../../lib/strapi-client'

const client = new StrapiClient();

export default function Post ({ postData }) {
    const router = useRouter();
    const { pid } = router.query;
    return (
        <div>Post: {pid}</div>
    )
}