"use client";

import DefaultLayout from '@/app/DefaultLayout';
import ECommerce from '@/components/Dashboard/E-commerce';
import React from 'react'

export default function page() {
    return (
        <DefaultLayout>
            <ECommerce />
        </DefaultLayout>
    )
}
