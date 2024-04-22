"use client";
import { useState } from "react";
// import axiosInstance from "@/axiosInstance"
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errMssg, setErrMssg] = useState("");
  const [N, setN] = useState();
  const [K, setK] = useState();
  const [P, setP] = useState();
  const [rainfall, setRainfall] = useState();
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();
  const [pH, setpH] = useState();
  const [crop, setCrop] = useState(); //initailly must be empty

  async function handleSubmit(e) {
    e.preventDefault();

    if (!N || !K || !P || !rainfall || !humidity || !pH || !temperature) {
      setErrMssg("Please Enter all fields correctly!");
      console.log(" call returuning");
      return;
    } else {
      setLoading(true);
      try {
        const data = {
          N: Number(N),
          P: Number(P),
          K: Number(K),
          temperature: Number(temperature),
          humidity: Number(humidity),
          pH: Number(pH),
          rainfall: Number(rainfall),
        };
        console.log(data);
        const res = await axios.post(
          "http://127.0.0.1:5000/api/crop_recommender",
          data
        );
        if (res.status === 200) {
          const data = res.data;
          setCrop(data?.prediction);
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
      <h1 className="h5-bold ml-8">Best Crop for your land</h1>
      <p className="ml-8 mt-1 mb-8 sm:mb-4 p-regular-14  text-muted-foreground">
        use our best crop recommendation model to find the best suitable crop
        for your land
      </p>
      <section>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 mx-auto md:max-w-md px-4"
        >
          <section className="flex gap-3 justify-evenly ">
            <div className="space-y-2">
              <label>Nitrogen(N)</label>
              <Input
                placeholder="Nitrogen"
                value={N}
                onChange={(e) => {
                  setN(e.target.value);
                  setErrMssg("");
                }}
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label>Phosphorous(P)</label>
              <Input
                placeholder="Phosphorous"
                value={P}
                onChange={(e) => {
                  setP(e.target.value);
                  setErrMssg("");
                }}
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label>Potassium(K)</label>
              <Input
                placeholder="Potassium"
                value={K}
                onChange={(e) => {
                  setK(e.target.value);
                  setErrMssg("");
                }}
                type="number"
              />
            </div>
          </section>
          <section className="flex flex-1 gap-3 justify-evenly ">
            <div className="space-y-2">
              <label>Temperature</label>
              <Input
                placeholder="temperature in °C"
                value={temperature}
                onChange={(e) => {
                  setTemperature(e.target.value);
                  setErrMssg("");
                }}
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label>Humidity</label>
              <Input
                placeholder="Humidity in  g/m3"
                value={humidity}
                onChange={(e) => {
                  setHumidity(e.target.value);
                  setErrMssg("");
                }}
                type="number"
              />
            </div>
          </section>
          <section className="flex flex-1 gap-3 justify-evenly ">
            <div className="space-y-2">
              <label>pH of soil</label>
              <Input
                placeholder="0 - 14"
                value={pH}
                onChange={(e) => {
                  setpH(e.target.value);
                  setErrMssg("");
                }}
                type="number"
              />
            </div>
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
          </section>
          <Button
            type="submit"
            variant="default"
            disabled={loading}
            className="text-white"
          >
            Submit
          </Button>
        </form>
        <div>
          <p className="text-center text-xs text-destructive ">{errMssg}</p>
        </div>
      </section>

      {crop && (
        <section>
          <p className="p-regular-14 mt-8">
            The best suitable crop to your land is{" "}
            <span className="italic">{crop}</span>
          </p>
          <p className="p-regular-14 mt-2">
            {" "}
            Want to monitor the crop ?{" "}
            <Link
              href={{
                pathname: "/dashboard/add-crop",
                query: { N, P, K, pH, crop },
              }}
            >
              <Button
                variant="linkp"
                className="font-bold"
                // onClick={(e) => {
                // e.preventDefault(); router.push({
                //     pathname: "/dashboard/add-crop",
                //     query: { N, P, K, pH, crop }
                // });
                // }}
              >
                {" "}
                Add Crop
              </Button>
            </Link>{" "}
          </p>
        </section>
      )}
    </div>
  );
}
