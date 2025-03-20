import { AvailableDoctorProps } from "@/types/data-types";
import { checkRole } from "@/utils/roles";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card } from "./ui/card";
import { daysOfWeek } from "@/utils";
import { cn } from "@/lib/utils";

const getToday = () => {
  const today = new Date().getDay();
  return daysOfWeek[today];
};

const todayDay = getToday();

interface Days {
  day: string;
  start_time: string;
  close_time: string;
}

interface DataProps {
  data: AvailableDoctorProps;
}

export const availableDays = ({ data }: { data: Days[] }) => {
  const isTodayWorkingDay = data?.find(
    (dayObj) => dayObj?.day?.toLowerCase() === todayDay
  );

  return isTodayWorkingDay
    ? `${isTodayWorkingDay?.start_time} - ${isTodayWorkingDay?.close_time}`
    : "غير متوفر";
};

export const AvailableDoctors = async ({ data }: DataProps) => {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">الأطباء المتاحون</h1>

        {(await checkRole("ADMIN")) && (
          <Button
            asChild
            variant={"outline"}
            disabled={data?.length === 0}
            className="disabled:cursor-not-allowed disabled:text-gray-200"
          >
            <Link href="/record/doctors">عرض الكل</Link>
          </Button>
        )}
      </div>

      <div className="w-full space-y-5 md:space-y-0 md:gap-6 flex flex-col md:flex-row md:flex-wrap">
        {data?.map((doc, id) => (
          <Card
            key={id}
            className=" border-none  w-full md:w-[300px] min-h-28 xl:w-full p-4 flex  gap-4 odd:bg-emerald-600/5 even:bg-yellow-600/5"
          >
            <div>
              <h2 className="font-semibold text-lg md:text-xl">{doc?.name}</h2>
              <p className="text-base capitalize text-gray-600">
                {doc?.specialization}
              </p>
              <p className="text-sm flex items-center">
                <span className="hidden lg:flex">الوقت المتاح:</span>
                {availableDays({ data: doc?.working_days })}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
