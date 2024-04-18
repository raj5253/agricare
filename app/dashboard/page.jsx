"use client"
import React, { useState, useEffect, useId } from 'react'
import axios from "../../axiosInstance"
import Loading from './loading';
import { Button } from "../../components/ui/button"
import { auth, currentUser, useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner"


const Page = () => {
    const [crops, setCrops] = useState('');
    const [fetching, setFetching] = useState(true)
    const router = useRouter();

    //M-1 useAuth() => takes no time. No access to publicMetadata. you can make api call directly.
    //M-2 useUser() => takes time to load. Access to publicMetadata. wait to load it, then only make api call.

    // const { isLoaded, userId, sessionId, getToken } / const user = useAuth(); //from this, userId is clerkId. No id here.
    const { user } = useUser() //takes time to load cautious from this id is clerkId. user.publicMetadata.userId is mongodbId

    useEffect(() => {
        //call api only after userUser() load
        if (user?.publicMetadata?.userId) {
            const fetchAllCrops = async () => {
                try {
                    // console.log(user)
                    const res = await axios.get('/user/all-crops');
                    console.log(res.data)
                    if (res.status === 200) {
                        setCrops(res.data)
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setFetching(false)
                }
            }
            fetchAllCrops()
        }
    }, [user])



    return (
        <div>
            {fetching && <Loading />}
            {!fetching && !crops && <div className>
                <div className='container'>
                    <div className='flex  justify-start sm:justify-center border-b p-2 mb-2' >
                        <h1 className='h3-bold'> Your Crops </h1>
                    </div>
                    <p className=' text-black'>No crop found. Click on add crop to add a crop for monitoring.</p>
                    <Button variant="linkp" size="lg" className="font-bold" onClick={(e) => { e.preventDefault(); router.push("/dashboard/add-crop") }}   >
                        Add Crop
                    </Button>
                </div>
            </div>}
            {!fetching && crops && (
                <section className="mt-4">
                    <ul className="divide-y divide-gray-200">
                        {crops.map((crop, index) => (
                            <li key={index} className="py-2">
                                {/* Render crop data here */}
                                <div className="flex items-center">
                                    <span className="font-semibold">{crop.crop_name}</span>
                                    <span className="ml-2 text-gray-500">ID: {crop.crop_id}</span>
                                </div>
                                <div className="mt-1 text-gray-600">
                                    Start Date: {new Date(crop.start_date).toLocaleDateString()}
                                </div>
                                <div className="mt-1 text-gray-600">
                                    End Date: {new Date(crop.end_date).toLocaleDateString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <Toaster />
        </div>


    )
}

export default Page