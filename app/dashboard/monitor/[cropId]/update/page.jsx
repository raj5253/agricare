"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CropDetailPage = () => {
  const [crop, setCrop] = useState(null);
  const params = useParams(); //there are other hooks also: userSearchParams, useQueryParams
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [lastIrrigation, setLastIrrigation] = useState();
  const [harvested, setHarvested] = useState("");
  const [errMssg, setErrMssg] = useState("");
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const preFetch = async () => {
      try {
        const res = await axios.get(`/api/user/crops/${params.cropId}`);
        if (res.status === 200) {
          console.log(res.data);
          const _crop = res.data.crop;
          const _startDate = new Date(_crop.startDate);
          const now = new Date();

          const diff = now.getDate() - _startDate.getDate();
          console.log(diff);
          setPercent((diff * 100) / _crop.period);
          setCrop(_crop);
          setHarvested(res.data.crop.harvested);
          setLastIrrigation(
            Math.floor(new Date(_crop?.lastIrrigation).getTime() / 1000)
          );
        }
        // else {
        //   console.log("hiiiiiiii")
        //   router.push("/not-found");
        // }
      } catch (error) {
        console.log(error);
        console.log("hiiiiiiii");
        router.replace("/not-found");
      }
    };
    preFetch();

    return () => {};
  }, [params.cropId, router]);

  const handleSelectDate = (date) => {
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    setLastIrrigation(unixTimestamp);
    console.log(unixTimestamp);
  };

  const handleSubmit = async (e) => {
    const data = { harvested, lastIrrigation: new Date(lastIrrigation * 1000) };
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(`/api/user/crops/${params.cropId}`, data);
      if (res.status === 200) {
        toast.success("Updated");
        router.replace(`/dashboard/monitor/${params.cropId}`);
        router.refresh();
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
    <div className="container">
      <h1 className="h5-bold ml-8">Update Crop Details </h1>
      <p className="ml-8 mt-1 mb-8 sm:mb-4 p-regular-14  text-muted-foreground">
        crop Id: {crop?.cropId}, Crop name: {crop?.crop}
      </p>
      <section>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-8 mx-auto md:max-w-md px-4"
        >
          <section className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3 ">
            {
              <div className="space-y-2">
                <label>Harvested</label>
                <select
                  disabled={percent < 90}
                  value={harvested}
                  onChange={(e) => {
                    setHarvested(e.target.value);
                    setErrMssg("");
                  }}
                  className="select-input"
                >
                  <option value="" className="text-muted">
                    Select{" "}
                  </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            }
            <div className="flex flex-col space-y-2">
              <label>Last Irrigation</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "xs:w-[240px] pl-3 text-left font-normal",
                      !lastIrrigation && "text-muted-foreground"
                    )}
                  >
                    {lastIrrigation ? (
                      format(new Date(lastIrrigation * 1000), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      lastIrrigation ? new Date(lastIrrigation * 1000) : null
                    }
                    onSelect={(date) => handleSelectDate(date)}
                    disabled={(date) => date < new Date("2024-01-01")}
                    initialFocus
                    format="MMM d, yyyy"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </section>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="default"
              disabled={isLoading}
              className="text-white"
            >
              Submit
            </Button>
          </div>
        </form>
        <div>
          <p className="text-center text-xs text-destructive ">{errMssg}</p>
        </div>
      </section>
    </div>
  );
};

export default CropDetailPage;
