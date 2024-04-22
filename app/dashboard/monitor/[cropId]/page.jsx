'use client'

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import axios from "axios";

const CropDetailPage = () => {
  const [crop, setCrop] = useState(null)
  const params = useParams(); //there are other hooks also: userSearchParams, useQueryParams

  useEffect(() => {
    const preFetch = async () => {
      const res = await axios.get(`/api/user/crops/${params.cropId}`);
      if (res.status === 200) {
        setCrop(res.data.crop)
        console.log(res.data)
      }
    }

    preFetch()
    return () => { }
  }, [params.cropId])

  return <div >
    <div className="container">
      {crop && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{crop.crop}</h2>
          <p className="text-gray-600 mb-1">Start Date: {new Date(crop.startDate).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-1">Last Update: {new Date(crop.lastUpdate).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-1">End Date: {crop.endDate ? new Date(crop.endDate).toLocaleDateString() : 'N/A'}</p>
          <p className="text-gray-600 mb-1">Location: {crop.location.latitude}, {crop.location.longitude}</p>
          <p className="text-gray-600 mb-1">Area: {crop.area}</p>
          <p className="text-gray-600 mb-1">Period: {crop.period}</p>
          <p className="text-gray-600 mb-1">E Yield: {crop.e_yield || 'N/A'}</p>
          <p className="text-gray-600 mb-1">Yield: {crop.yield || 'N/A'}</p>
          <p className="text-gray-600 mb-1">Harvested: {crop.harvested ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  </div>
};

export default CropDetailPage
