"use client";
import { useState } from "react";
// import axiosInstance from "@/axiosInstance"
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cropList, cropSeasons, indianStates } from "@/constants";

export default function ProfileForm() {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [errMssg, setErrMssg] = useState("");
	const [crop, setCrop] = useState("");
	const [season, setSeason] = useState("");
	const [rainfall, setRainfall] = useState("");
	const [state, setState] = useState("");
	const [fertilizer, setFertilizer] = useState("");
	const [area, setArea] = useState("");

	const [cropYield, setCopYield] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		if (!crop || !season || !rainfall || !state || !fertilizer || !area) {
			setErrMssg("Please Enter all fields correctly!");
			console.log("Call returuning");
			return;
		} else {
			setLoading(true);
			try {
				const data = {
					Crop: crop,
					Season: season.padEnd(11," "),
					Fertilizer: Number(fertilizer),
					State: state,
					Annual_Rainfall: Number(rainfall),
					Area: Number(area),
				};
				console.log(data);
				const res = await axios.post("/api/yield", data);
				if (res.status === 200) {
					console.log(res.data);
					setCopYield(res.data?.prediction * 10);
				}
			} catch (error) {
				console.error("Error:", error);
			} finally {
				setLoading(false);
			}
		}
	}

	return (
		<div className="container">
			<h1 className="h5-bold ml-8">Predict the yield for your field</h1>
			<p className="ml-8 mt-1 mb-8 sm:mb-4 p-regular-14  text-muted-foreground">
				use our best yield prediction model to find the estimated yield
				of your field
			</p>
			<section>
				<form
					onSubmit={handleSubmit}
					className="space-y-8 mx-auto md:max-w-md px-4"
				>
					<section className="grid grid-cols-2 gap-3">
						<div className="space-y-2">
							<label>Crop</label>
							{/* <Input placeholder="crop name" value={crop} onChange={(e) => { setCrop(e.target.value); setErrMssg('') }} type="text" /> */}
							<select
								value={crop}
								onChange={(e) => {
									setCrop(e.target.value);
									setErrMssg("");
								}}
								className="select-input"
							>
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
							<select
								value={season}
								onChange={(e) => {
									setSeason(e.target.value);
									setErrMssg("");
								}}
								className="select-input"
							>
								<option value="">Select Season</option>
								{cropSeasons.map((season, index) => (
									<option key={index} value={season}>
										{season}
									</option>
								))}
							</select>
						</div>
					</section>
					<section className="grid grid-cols-2 gap-3 ">
						<div className="space-y-2">
							<label>State</label>
							{/* <Input placeholder="Indian state" value={state} onChange={(e) => { setState(e.target.value); setErrMssg('') }} type="number" /> */}
							<select
								placeholder="Indian state"
								value={state}
								onChange={(e) => {
									setState(e.target.value);
									setErrMssg("");
								}}
								className="select-input"
							>
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
							<Input
								placeholder="fertilizer used"
								value={fertilizer}
								onChange={(e) => {
									setFertilizer(e.target.value);
									setErrMssg("");
								}}
								type="number"
							/>
						</div>
					</section>
					<section className="flex flex-1 gap-3 justify-evenly ">
						<div className="space-y-2">
							<label>Rainfall</label>
							<Input
								placeholder="Rainfall in mm"
								value={rainfall}
								onChange={(e) => {
									setRainfall(e.target.value);
									setErrMssg("");
								}}
								type="number"
							/>
						</div>
						<div className="space-y-2">
							<label>Land Area</label>
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
					</section>
					<section className="flex items-center justify-center">
						<div className="flex items-end justify-end">
							<Button
								type="submit"
								variant="default"
								disabled={loading}
								className="text-white mr-4"
							>
								Submit
							</Button>
						</div>
					</section>
				</form>
				<div>
					<p className="text-center text-xs text-destructive  mt-4">
						{errMssg}
					</p>
				</div>
			</section>

			{!!cropYield && (
				<section>
					<p className="p-regular-14 mt-8">
						The estimated yield of your land is :{" "}
						<span className="italic">{cropYield}</span>{" "}
						Tonnes/Hectare
					</p>
				</section>
			)}
		</div>
	);
}
