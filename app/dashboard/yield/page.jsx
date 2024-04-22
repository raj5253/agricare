"use client"
import { useState } from "react"
// import axiosInstance from "@/axiosInstance"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cropList, cropSeasons, indianStates } from "@/constants"


export default function ProfileForm() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [errMssg, setErrMssg] = useState('')
    const [crop, setCrop] = useState('')
    const [season, setSeason] = useState('')
    const [area, setArea] = useState('')
    const [rainfall, setRainfall] = useState('')
    const [state, setState] = useState('')
    const [fertilizer, setFertilizer] = useState('')

    const [cropYield, setCopYield] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        if (!crop || !season || !area || !rainfall || !state || !fertilizer) {
            setErrMssg("Please Enter all fields correctly!")
            console.log(" call returuning")
            return;
        }
        else {
            setLoading(true);
            try {
                const data = { crop, area, season, fertilizer, state, rainfall }
                console.log(data);
                // const res = await axios.post("/py/yield", data);
                // if (res.status === 200) {
                //     //raj
                //     console.log(res.data)
                setCopYield(560.00)
                // }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="container" >
            <h1 className="h5-bold ml-8">Predict the yield for your field</h1>
            <p className="ml-8 mt-1 mb-8 sm:mb-4 p-regular-14  text-muted-foreground">use our best yield prediction model to find the estimated yield of your field</p>
            <section >
                <form onSubmit={handleSubmit} className="space-y-8 mx-auto md:max-w-md px-4">
                    <section className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label>Crop</label>
                            {/* <Input placeholder="crop name" value={crop} onChange={(e) => { setCrop(e.target.value); setErrMssg('') }} type="text" /> */}
                            <select value={crop} onChange={(e) => { setCrop(e.target.value); setErrMssg('') }} className="block p-2 border rounded-md focus:">
                                <option value="">Select Crop</option>
                                {cropList.map((crop, index) => (
                                    <option key={index} value={crop}>
                                        {crop}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label>Season</label>
                            {/* <Input placeholder="season" value={season} onChange={(e) => { setSeason(e.target.value); setErrMssg('') }} type="text" /> */}
                            <select value={season} onChange={(e) => { setSeason(e.target.value); setErrMssg('') }} className="block">
                                <option value="">Select Season</option>
                                {cropSeasons.map((season, index) => (
                                    <option key={index} value={season}>
                                        {season}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </section>
                    <section className="flex flex-1 gap-3 justify-evenly ">
                        <div className="space-y-2">
                            <label>State</label>
                            {/* <Input placeholder="Indian state" value={state} onChange={(e) => { setState(e.target.value); setErrMssg('') }} type="number" /> */}
                            <select placeholder="Indian state" value={state} onChange={(e) => { setState(e.target.value); setErrMssg('') }} >
                                <option value="">Select state</option>
                                {indianStates.map((istate, index) => (
                                    <option key={index} value={istate}>
                                        {istate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label>Fertilizer</label>
                            <Input placeholder="fertilizer used" value={fertilizer} onChange={(e) => { setFertilizer(e.target.value); setErrMssg('') }} type="number" />
                        </div>
                    </section>
                    <section className="flex flex-1 gap-3 justify-evenly ">
                        <div className="space-y-2">
                            <label>Rainfall</label>
                            <Input placeholder="Rainfall in mm" value={rainfall} onChange={(e) => { setRainfall(e.target.value); setErrMssg('') }} type="number" />
                        </div>
                        <div className="space-y-2">
                            <label>Area under cultivation</label>
                            <Input placeholder="area in m2" value={area} onChange={(e) => { setArea(e.target.value); setErrMssg('') }} type="number" />
                        </div>
                    </section>
                    <Button type="submit" variant="default" disabled={loading} className="text-white" >Submit</Button>
                </form>
                <div>
                    <p className="text-center text-xs text-destructive ">{errMssg}</p>
                </div>
            </section>

            {cropYield &&
                <section>
                    <p className="p-regular-14 mt-8">The estimated yield of your land is : <span className="italic">{cropYield}</span></p>
                </section>
            }
        </div >
    )
}

// "Crop" : "Potato",
//  "Season" : "Karnataka",
//     "State": "Assam",
//     "Area": 28755,
//     "Production": 317052,
//     "Annual_Rainfall": 1260.8,
//     "Fertilizer": 2840994

