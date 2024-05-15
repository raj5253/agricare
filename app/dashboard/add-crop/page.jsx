"use client";
import { useState } from "react";
// import axios from "@/axiosInstance"
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import geolocation from "geolocation";

export default function AddCropForm({ searchParams }) {
	const [loading, setLoading] = useState(false);
	const [errMssg, setErrMssg] = useState("");
	const [crop, setCrop] = useState(searchParams.crop);
	const [cropId, setHumidity] = useState("");
	const [area, setArea] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [startDate, setStartDate] = useState(null);
	const [period, setPeriod] = useState("");

	const router = useRouter();

	const handleSetLocation = (e) => {
		e.preventDefault();
		geolocation.getCurrentPosition(function (err, position) {
			if (err) {
				console.log(err);
				return;
			}
			setLatitude(position.coords.latitude);
			setLongitude(position.coords.longitude);
		});
	};

	const handleSelectDate = (date) => {
		const unixTimestamp = Math.floor(date.getTime() / 1000);
		setStartDate(unixTimestamp);
		console.log(unixTimestamp);
	};

	async function handleSubmit(e) {
		e.preventDefault();

		if (
			!latitude ||
			!longitude ||
			!crop ||
			!cropId ||
			!area ||
			!period ||
			!startDate
		) {
			setErrMssg("Please Enter all fields correctly!");
			// console.log("call returuning")
			return;
		} else {
			setLoading(true);
			try {
				const data = {
					crop,
					cropId,
					area,
					longitude,
					latitude,
					period,
					startDate,
				};
				console.log(data);
				const res = await axios.post("/api/user/crops", data);
				if (res.status === 200) {
					console.log(res.data);
					toast("Crop is now added to your list", {
						description: `with start date: ${format(
							new Date(startDate * 1000),
							"PPP"
						)}`,
						action: {
							label: "close",
							onClick: () => {},
						},
					});
					setTimeout(() => {
						router.push("/dashboard");
					}, 3000);
				}
				setLoading(false);
			} catch (error) {
				console.error("Error:", error);
				setLoading(false);
			}
		}
	}

	return (
		<div className="container">
			<h1 className="h5-bold ml-8">Best Crop for your land</h1>
			<p className="ml-8 mt-1 mb-8 sm:mb-4 p-regular-14  text-muted-foreground">
				use our best crop recommendation model to find the best suitable
				crop for your land
			</p>
			<section>
				<form
					onSubmit={handleSubmit}
					className="space-y-8 mx-auto md:max-w-md px-4"
				>
					{/* location values - longitude & latitude */}
					<section className="flex gap-3 justify-evenly ">
						<div className="space-y-1">
							<label>Latitude</label>
							<Input
								placeholder="Latitude"
								value={latitude}
								onChange={(e) => {
									setLatitude(e.target.value);
									setErrMssg("");
								}}
								type="number"
							/>
						</div>
						<div className="space-y-1">
							<label>Longitude</label>
							<Input
								placeholder="Longitude"
								value={longitude}
								onChange={(e) => {
									setLongitude(e.target.value);
									setErrMssg("");
								}}
								type="number"
							/>
						</div>
						<div className="space-y-1 flex  items-center">
							<Button variant="linkp" onClick={handleSetLocation}>
								{" "}
								Current <MapPin />
							</Button>
						</div>
					</section>
					{/* crop id and crop name */}
					<section className="flex flex-1 gap-3 justify-evenly ">
						<div className="space-y-1">
							<label>Cultivation area</label>
							<Input
								placeholder="in m2"
								value={area}
								onChange={(e) => {
									setArea(e.target.value);
									setErrMssg("");
								}}
								type="number"
							/>
						</div>
						<div className="space-y-1">
							<label>CropId</label>
							<Input
								placeholder="referece id"
								value={cropId}
								onChange={(e) => {
									setHumidity(e.target.value);
									setErrMssg("");
								}}
								type="text"
							/>
						</div>
					</section>
					{/* crop and time period */}
					<section className="flex flex-1 gap-3 justify-evenly ">
						<div className="space-y-1">
							<label>Crop</label>
							<Input
								placeholder="crop name"
								value={crop}
								onChange={(e) => {
									setCrop(e.target.value);
									setErrMssg("");
								}}
								type="text"
							/>
						</div>
						<div className="space-y-1">
							<label>Crop Duration</label>
							<Input
								placeholder="Number of days"
								value={period}
								onChange={(e) => {
									setPeriod(e.target.value);
									setErrMssg("");
								}}
								type="number"
							/>
						</div>
					</section>
					{/* start date --calendar */}
					<section className="flex flex-1 gap-3 justify-between items-center">
						<div className="flex flex-col space-y-1">
							<label>Start date</label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-[240px] pl-3 text-left font-normal",
											!startDate &&
												"text-muted-foreground"
										)}
									>
										{startDate ? (
											format(
												new Date(startDate * 1000),
												"PPP"
											)
										) : (
											<span>Pick a date</span>
										)}
										<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={
											startDate
												? new Date(startDate * 1000)
												: null
										}
										onSelect={(date) =>
											handleSelectDate(date)
										}
										disabled={(date) =>
											date < new Date("2024-01-01")
										}
										initialFocus
										format="MMM d, yyyy"
									/>
								</PopoverContent>
							</Popover>
						</div>
						<Button
							type="submit"
							variant="default"
							disabled={loading}
							className="text-white mt-7"
						>
							Submit
						</Button>
					</section>
				</form>
			</section>
			<div>
				<p className="text-center text-xs text-destructive ">
					{errMssg}
				</p>
			</div>
			<Toaster />
		</div>
	);
}
