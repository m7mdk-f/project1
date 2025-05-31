import React, { SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import LoadingCircle from '../LoadingCircle';
import { IStoreRediness } from '../models/Models';
import { GetAllStoreReadiness } from '../api/apiAboutYou';

function CheckBox({ options, checkedItems, setCheckedItems, setOption }: { setCheckedItems: React.Dispatch<SetStateAction<number[]>>, checkedItems: number[], options: IStoreRediness[], setOption: React.Dispatch<SetStateAction<IStoreRediness[]>> }) {
    const Router = useRouter();
    const [loading, setLoadnin] = useState<boolean>(true);

    const toggleCheck = (id: number) => {
        setCheckedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );

    };
    useEffect(() => {
        GetAllStoreReadiness().then(data => {
            setOption(data)
        }).catch((e) => {
            alert(e)
            Router.push("/login")
        }).finally(() => {
            setLoadnin(false)
        })

    }, [])
    return (
        <div className="mb-10 p-4">
            {loading ?
                <div className='flex justify-center items-center'>
                    <LoadingCircle />
                </div>
                :
                <div>
                    <h2 className="text-lg font-semibold mb-4">ما مدى جاهزية متجرك؟</h2>
                    <div className="space-y-3">
                        {options.map((item) => (
                            <label
                                key={item.id}
                                className="flex items-center cursor-pointer select-none"
                            >
                                <input
                                    type="checkbox"
                                    checked={checkedItems.includes(item.id)}
                                    onChange={() => toggleCheck(item.id)}
                                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="mr-3 text-gray-900">{item.title}</span>
                            </label>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default CheckBox