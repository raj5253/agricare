"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";


const CropDetailPage = () => {
  const [crop, setCrop] = useState(null);
  const params = useParams(); //there are other hooks also: userSearchParams, useQueryParams
  const [isLoading, setIsLoading] = useState(false);
  const [endDate, setEndDate] = useState();
  const [water, setWater] = useState(0);

  const router = useRouter()

  useEffect(() => {
    const preFetch = async () => {
      const res = await axios.get(`/api/user/crops/${params.cropId}`);
      if (res.status === 200) {
        setCrop(res.data.crop);
        const cropdata = res.data.crop;
        const endDate = new Date(cropdata?.startDate);
        endDate.setDate(endDate.getDate() + cropdata?.period);
        let w = 0;
        cropdata?.water.forEach((et) => {
          w += et;
        });
        setWater(Math.round((w * cropdata?.area) / (1000 * 0.6)));
        setEndDate(endDate);
        console.log(res.data);
      }
    };

    preFetch();
    return () => { };
  }, [params.cropId, isLoading]);

  const clickhandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `http://127.0.0.1:5000/api/crop_details/${params.cropId}/update`
      );
      if (res.status === 200) {
        toast.success("Updated");
        console.log(res.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(`Error : ${params.cropId} : `, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        {crop && (
          <div className="bg-white shadow-md rounded-lg p-4 relative">
            <div className="absolute top-4 right-6">
              <button onClick={clickhandler} disabled={isLoading}>
                <Image
                  src={"/images/refresh.svg"}
                  className="h-6 w-6"
                  width={24}
                  height={24}
                  alt="refresh"
                />
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">{crop.crop}</h2>
            <p className="text-gray-600 mb-1">
              Start Date: {new Date(crop.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-1">
              Last Update: {new Date(crop.lastUpdate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-1">
              End Date: {endDate ? endDate.toLocaleDateString() : "N/A"}
            </p>
            <p className="text-gray-600 mb-1">
              Location: {crop.location.latitude}, {crop.location.longitude}
            </p>
            <p className="text-gray-600 mb-1">
              Area: {crop.area} m<sup>2</sup>
            </p>
            <p className="text-gray-600 mb-1">Period: {crop.period} days</p>
            {/* <p className="text-gray-600 mb-1">
              E Yield: {crop.e_yield || "N/A"}
            </p>
            <p className="text-gray-600 mb-1">Yield: {crop.yield || "N/A"}</p> */}
            <p className="text-gray-600 mb-1">
              Harvested: {crop.harvested ? "Yes" : "No"}
            </p>
            <p className="text-gray-600 mb-1">Water Required : {crop?.harvested ? "N/A" : <>{water} m<sup>3</sup></>}</p>
            <div className="w-full flex flex-row items-center justify-center ">
              {" "}
              <Button onClick={() => { router.push(`/dashboard/monitor/${params.cropId}/update`) }}> Update </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDetailPage;
