import { Button } from "@/components/ui/button";
import { getRole } from "@/utils/roles";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  const role = await getRole();

  if (userId && role) {
    redirect(`/${role}`);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center leading-14">
            اهلاً وسهلاً بك في نظام <br />
            <span className="text-blue-700 text-5xl md:text-6xl inline-block">Health+</span>
          </h1>
        </div>

        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <p className="mb-8">
            من خلال هذا النظام نسعى لتنظيم مواعيدكم و متابعة حالتكم الصحية
          </p>

          <div className="flex gap-4">
            {userId ? (
              <>
                <Link href={`/${role}`}>
                  <Button>عرض لوحة التحكم</Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="md:text-base underline hover:text-nlue-600"
                  >
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="md:text-base font-light">مريض جديد</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="mt-8">
        <p className="text-center text-sm">
          &copy; 2024 Health+ Hospital Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
