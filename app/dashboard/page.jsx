"use client"
import React, { useState, useEffect, useId } from 'react'
// import axios from "../../axiosInstance"
import axios from 'axios';
import Loading from './loading';
import { Button } from "../../components/ui/button"
import { auth, currentUser, useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/sonner"
import CropTable from "@/components/CropTable"

const Page = () => {
    const [crops, setCrops] = useState([]);
    const [fetching, setFetching] = useState(true)
    const router = useRouter();

    //M-1 useAuth() => takes no time. No access to publicMetadata. you can make api call directly.
    //M-2 useUser() => takes time to load. Access to publicMetadata. wait to load it, then only make api call.

    // const { isLoaded, userId, sessionId, getToken } / const user = useAuth(); //from this, userId is clerkId. No id here.
    // const { user } = useUser() // user?.publicMetadata?.userId // takes time to load cautious from this id is clerkId. user.publicMetadata.userId is mongodbId

    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            const fetchAllCrops = async () => {
                try {
                    // console.log(user)
                    const res = await axios.get('/api/user/crops');
                    console.log(res.data)
                    if (res.status === 200) {
                        setCrops(res.data.crops)
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setFetching(false)
                }
            }
            fetchAllCrops()
        }
    }, [userId])



    return (
        <div >
            {fetching && <Loading />}
            {!fetching && !crops &&
                <div className='container'>
                    <div className='flex  justify-start sm:justify-center border-b p-2 mb-2' >
                        <h1 className='h3-bold'> Your Crops </h1>
                    </div>
                    <p className=' text-black'>No crop found. Click on add crop to add a crop for monitoring.</p>
                    <Button variant="linkb" size="lg" onClick={(e) => { e.preventDefault(); router.push("/dashboard/add-crop") }}   >
                        Add Crop
                    </Button>
                </div>}
            {!fetching && crops && (
                <section className="mt-4 container ">

                    <CropTable crops={crops} />
                    <Button variant="linkb" size="lg" onClick={(e) => { e.preventDefault(); router.push("/dashboard/add-crop") }}   >
                        Add Crop
                    </Button>
                </section>
            )}
            <Toaster />
        </div>


    )
}

export default Page