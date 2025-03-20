import { getRole } from "@/utils/roles";
import {
  Bell,
  LayoutDashboard,
  List,
  ListOrdered,
  Logs,
  LucideIcon,
  Pill,
  Receipt,
  Settings,
  SquareActivity,
  User,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { LogoutButton } from "./logout-button";

const ACCESS_LEVELS_ALL = [
  "admin",
  "doctor",
  "nurse",
  "lab technician",
  "patient",
];

const SidebarIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return <Icon className="size-6 lg:size-5" />;
};

export const Sidebar = async () => {
  const role = await getRole();

  const SIDEBAR_LINKS = [
    {
      label: "MENU",
      links: [
        {
          name: "لوحة التحكم",
          href: "/",
          access: ACCESS_LEVELS_ALL,
          icon: LayoutDashboard,
        },
        {
          name: "الملف الشخصي",
          href: "/patient/self",
          access: ["patient"],
          icon: User,
        },
      ],
    },
    {
      label: "ادارة",
      links: [
        {
          name: "المستخدمين",
          href: "/record/users",
          access: ["admin"],
          icon: Users,
        },
        {
          name: "الاطباء",
          href: "/record/doctors",
          access: ["admin"],
          icon: User,
        },
        {
          name: "المرضى",
          href: "/record/patients",
          access: ["admin", "doctor", "nurse"],
          icon: UsersRound,
        },
        {
          name: "المواعيد",
          href: "/record/appointments",
          access: ["admin", "doctor", "nurse"],
          icon: ListOrdered,
        },
        {
          name: "السجلات الطبية",
          href: "/record/medical-records",
          access: ["admin", "doctor", "nurse"],
          icon: SquareActivity,
        },
        {
          name: "المواعيد",
          href: "/record/appointments",
          access: ["patient"],
          icon: ListOrdered,
        },
        {
          name: "السجلات",
          href: "/patient/self",
          access: ["patient"],
          icon: List,
        },
        {
          name: "الوصفات الطبية",
          href: "#",
          access: ["patient"],
          icon: Pill,
        },
      ],
    },
    {
      label: "النظام",
      links: [
        {
          name: "الاشعارات",
          href: "/notifications",
          access: ACCESS_LEVELS_ALL,
          icon: Bell,
        },
        {
          name: "الاعدادات",
          href: "/admin/system-settings",
          access: ["admin"],
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <div className="w-full p-4 flex flex-col justify-between gap-4 bg-white overflow-y-scroll min-h-full">
      <div className="">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <div className="p-1.5 rounded-md bg-green-600  text-white">
            <SquareActivity size={22} />
          </div>
          <Link
            href={"/"}
            className="hidden lg:flex text-base 2xl:text-xl font-bold"
          >
            +health
          </Link>
        </div>

        <div className="mt-4 text-sm">
          {SIDEBAR_LINKS.map((el) => (
            <div key={el.label} className="flex flex-col gap-2">
              <span className="hidden uppercase lg:block text-gray-400 font-bold my-4">
                {el.label}
              </span>

              {el.links.map((link) => {
                if (link.access.includes(role.toLowerCase())) {
                  return (
                    <Link
                      href={link.href}
                      className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-blue-600/10"
                      key={link.name}
                    >
                      <SidebarIcon icon={link.icon} />
                      <span className="hidden lg:block">{link.name}</span>
                    </Link>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>

      <LogoutButton />
    </div>
  );
};
