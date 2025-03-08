"use client";

import { DoctorSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import { CustomInput, SwitchInput } from "../custom-input";
import { SPECIALIZATION } from "@/utils/settings";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { createNewDoctor } from "@/app/actions/admin";

const TYPES = [
  { label: "Full-Time", value: "FULL" },
  { label: "Part-Time", value: "PART" },
];

const WORKING_DAYS = [
  { label: "الاحد", value: "sunday" },
  { label: "الاثنين", value: "monday" },
  { label: "الثلاثاء", value: "tuesday" },
  { label: "الاربعاء", value: "wednesday" },
  { label: "الخميس", value: "thursday" },
  { label: "الجمعة", value: "friday" },
  { label: "السبت", value: "saturday" },
];

type Day = {
  day: string;
  start_time?: string;
  close_time?: string;
};

export const DoctorForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [workSchedule, setWorkSchedule] = useState<Day[]>([]);

  const form = useForm<z.infer<typeof DoctorSchema>>({
    resolver: zodResolver(DoctorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialization: "",
      address: "",
      type: "FULL",
      department: "",
      img: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof DoctorSchema>) => {
    try {
      if (workSchedule.length === 0) {
        toast.error("Please select work schedule");
        return;
      }

      setIsLoading(true);
      const resp = await createNewDoctor({
        ...values,
        work_schedule: workSchedule,
      });

      if (resp.success) {
        toast.success("Doctor added successfully!");

        setWorkSchedule([]);
        form.reset();
        router.refresh();
      } else if (resp.error) {
        toast.error(resp.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSpecialization = form.watch("specialization");

  useEffect(() => {
    if (selectedSpecialization) {
      const department = SPECIALIZATION.find(
        (el) => el.value === selectedSpecialization
      );

      if (department) {
        form.setValue("department", department.department);
      }
    }
  }, [selectedSpecialization]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus size={20} />
          اضافة طبيب
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="rounded-xl rounded-r-xl md:h-[90%] md:top-[5%] md:right-[1%] w-full overflow-y-scroll"
      >
        <SheetHeader>
          <SheetTitle>اضافة طبيب جديد</SheetTitle>
        </SheetHeader>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8 mt-5 2xl:mt-10"
            >
              <CustomInput
                type="radio"
                selectList={TYPES}
                control={form.control}
                name="type"
                label="وقت العمل"
                placeholder=""
                defaultValue="FULL"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="name"
                placeholder="Doctor's name"
                label="الاسم الكامل"
              />

              <div className="flex items-center gap-2">
                <CustomInput
                  type="select"
                  control={form.control}
                  name="specialization"
                  placeholder="اختر التخصص"
                  label="التخصص"
                  selectList={SPECIALIZATION}
                />
                <CustomInput
                  type="input"
                  control={form.control}
                  name="department"
                  placeholder="IT"
                  label="القسم"
                />
              </div>

              <div className="flex items-center gap-2">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="email"
                  placeholder="john@example.com"
                  label="عنوان البريد الالكتروني"
                />

                <CustomInput
                  type="input"
                  control={form.control}
                  name="phone"
                  placeholder="9225600735"
                  label="رقم التواصل"
                />
              </div>

              <CustomInput
                type="input"
                control={form.control}
                name="address"
                placeholder="نابلس حي المخفية عمارة رقم 7"
                label="العنوان"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="password"
                placeholder=""
                label="كلمة السر"
                inputType="password"
              />

              <div className="mt-6">
                <Label>Working Days</Label>

                <SwitchInput
                  data={WORKING_DAYS}
                  setWorkSchedule={setWorkSchedule}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                اضافة
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
