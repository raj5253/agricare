"use client"
import { useState } from "react"
// import axiosInstance from "@/axiosInstance"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"


export default function AddCropForm({ searchParams }) {
    const [loading, setLoading] = useState(false);
    const [errMssg, setErrMssg] = useState('')
    const [crop, setCrop] = useState(searchParams.crop)
    const [cropId, setHumidity] = useState('')
    const [area, setArea] = useState('')
    const [P, setP] = useState(searchParams.P)
    const [N, setN] = useState(searchParams.N)
    const [K, setK] = useState(searchParams.K)
    const [pH, setpH] = useState(searchParams.pH)
    const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')

    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!N || !K || !P || !crop || !cropId || !pH || !area || !startDate) {
            setErrMssg("Please Enter all fields correctly!")
            // console.log("call returuning")
            return;
        }
        else {
            setLoading(true);
            try {
                const data = { crop, cropId, area, N, P, K, pH, startDate }
                console.log(data);
                // const res = await axios.post("/add-crop", data);
                // if (res.status === 200) {
                //     //rahul 
                //     console.log(res.data)
                toast("Crop is now added to your list", {
                    description: `with start date: ${format(startDate, "PPP")}`, action: {
                        label: "close",
                        onClick: () => { }
                    },
                })
                setTimeout(() => {
                    router.push('/dashboard')
                }, 3000)
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
            <h1 className="h5-bold ml-8">Best Crop for your land</h1>
            <p className="ml-8 mt-1 mb-8 sm:mb-4 p-regular-14  text-muted-foreground">use our best crop recommendation model to find the best suitable crop for your land</p>
            <section >
                <form onSubmit={handleSubmit} className="space-y-8 mx-auto md:max-w-md px-4">
                    <section className="flex gap-3 justify-evenly ">
                        <div className="space-y-1">
                            <label>Nitrogen(N)</label>
                            <Input placeholder="Nitrogen" value={N} onChange={(e) => { setN(e.target.value); setErrMssg('') }} type="number" />
                        </div>
                        <div className="space-y-1">
                            <label>Phosphorous(P)</label>
                            <Input placeholder="Phosphorous" value={P} onChange={(e) => { setP(e.target.value); setErrMssg('') }} type="number" />
                        </div>
                        <div className="space-y-1">
                            <label>Potassium(K)</label>
                            <Input placeholder="Potassium" value={K} onChange={(e) => { setK(e.target.value); setErrMssg('') }} type="number" />
                        </div>
                    </section>
                    <section className="flex flex-1 gap-3 justify-evenly ">
                        <div className="space-y-1">
                            <label>Cultivation area</label>
                            <Input placeholder="in m3" value={area} onChange={(e) => { setArea(e.target.value); setErrMssg('') }} type="number" />
                        </div>
                        <div className="space-y-1">
                            <label>cropId</label>
                            <Input placeholder="your choice" value={cropId} onChange={(e) => { setHumidity(e.target.value); setErrMssg('') }} type="text" />
                        </div>
                    </section>
                    <section className="flex flex-1 gap-3 justify-evenly ">
                        <div className="space-y-1">
                            <label>pH of soil</label>
                            <Input placeholder="0 - 14" value={pH} onChange={(e) => { setpH(e.target.value); setErrMssg('') }} type="number" />
                        </div>
                        <div className="space-y-1">
                            <label>crop</label>
                            <Input placeholder="crop in mm" value={crop} onChange={(e) => { setCrop(e.target.value); setErrMssg('') }} type="text" />
                        </div>
                    </section>
                    <section className="flex flex-1 gap-3 justify-evenly ">
                        <div className="flex flex-col space-y-1">
                            <label>Start date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        {startDate ? (
                                            format(startDate, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        disabled={(date) =>
                                            date < new Date("2024-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </section>
                    <Button type="submit" variant="default" disabled={loading} className="text-white" >Submit</Button>
                </form>
            </section >
            <div>
                <p className="text-center text-xs text-destructive ">{errMssg}</p>
            </div>
            <Toaster />
        </div >
    )
}

