"use client"
import React, { useEffect, useState } from 'react'
import StepsComp from './StepsComp'
import BusinessExperienceForm from './BusinessExperienceForm'

import { FaCheck, FaClipboardCheck, FaUser } from 'react-icons/fa'
import { CheckAboutme } from '../api/apiAboutYou'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingCircle from '../LoadingCircle'

export default function ContaintSteps() {

    const [active, Setavtive] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

    const Router = useRouter();
    useEffect(() => {
        setLoading(true)
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            localStorage.setItem("token", tokenFromUrl)
        }
        const token = localStorage.getItem('token')
        if (!token) {
            Router.push('/login')
            return
        }
        CheckAboutme()
            .then(async d => {
                console.log(d)
                if (d.message == false) {
                }
                else {
                    await Router.push("/marwanpage");
                }
            })
            .catch(async () => {
                await Router.push('/login');
            })
            .finally(async () => {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            })
    }, []);
    return (

        <div className='w-full'>
            {loading ? <div className='flex justify-center'><LoadingCircle size={60} /> </div> :
                <div>
                    <div data-aos="fade-down" className='w-full flex justify-center '>
                        <ol className="flex  items-center lg:max-w-6xl md:max-w-2xl w-full py-7 shadow bg-white px-5">
                            <StepsComp icon={<FaCheck className="w-4 h-4 " />} status="done" Title='انشاء حساب' />
                            <StepsComp icon={active ? <FaCheck className="w-4 h-4 " /> : <FaUser className="w-4 h-4 " />} status={`${active ? 'done' : 'current'}`} number={2} Title='انشاء حساب' />
                            <StepsComp icon={<FaClipboardCheck className="w-4 h-4 " />} status="pending" last number={3} Title='انشاء حساب' />
                        </ol>
                    </div>
                    <div
                        data-aos="fade-up"
                        className='w-full flex justify-center items-center'>
                        <BusinessExperienceForm active={active} setAcive={Setavtive} />
                    </div>
                </div>}
        </div>
    )
}
