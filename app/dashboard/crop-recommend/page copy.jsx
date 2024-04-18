"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axiosInstance from "@/axiosInstance"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    N: z.number().min(0).refine(value => typeof value === "number", {
        message: "Value must be a number",
    }),
    P: z.number().min(0).refine(value => typeof value === "number", {
        message: "Value must be a number",
    }),
    K: z.number().min(0).refine(value => typeof value === "number", {
        message: "Value must be a number",
    }),
    temperature: z.number().min(0).max(14).refine(value => typeof value === "number", {
        message: "Value must be a number between 0 and 14",
    }),
    humidity: z.number().min(0).refine(value => typeof value === "number", {
        message: "Value must be a number",
    }),
    pH: z.number().min(0).refine(value => typeof value === "number", {
        message: "Value must be a number",
    }),
    rainfall: z.number().min(0).refine(value => typeof value === "number", {
        message: "Value must be a number",
    }),
}).strict();

export default function ProfileForm() {
    const [loading, setLoading] = useState(false);
    // 1. Define your form.
    const form = useForm({
        // resolver: zodResolver(formSchema),
        // defaultValues: {
        //     N: 0,
        //     P: 0,
        //     K: "",
        //     temperature: "",
        //     humidity: "",
        //     pH: "",
        //     rainfall: "",
        // },
    })

    // 2. Define a submit handler.
    async function onSubmit(data) {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/py/crop-recommend", data);
            console.log("Response:", response.data);
            // Handle successful response
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container" >
            <h1 className="h5-bold ml-8">Best Crop for your land</h1>
            <p className="ml-8 mt-1 mb-8 sm:mb-4 p-regular-14  text-muted-foreground">use our best crop recommendation model to find the best suitable crop for your land</p>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto md:max-w-md px-4">
                    <section className="flex gap-3 justify-evenly ">
                        <FormField
                            control={form.control}
                            name="N"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nitrogen(N)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nitrogen" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="P"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phosphorous(P)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Phosphorous" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="K"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Potassium(K)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Potassium" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                    <section className="flex flex-1 gap-3 justify-evenly ">
                        <FormField
                            control={form.control}
                            name="temperature"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Temperature</FormLabel>
                                    <FormControl>
                                        <Input placeholder="temperature in °C" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="humidity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Humidity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Humidity in  g/m3" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                    <section className="flex flex-1 gap-3 justify-evenly ">
                        <FormField
                            control={form.control}
                            name="pH"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>pH of soil</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0 - 14" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="rainfall"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rainfall</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Rainfall in mm" {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                    <Button type="submit" variant="default" disabled={loading} className="text-white" >Submit</Button>
                </form>
            </Form>
        </div>

    )
}

