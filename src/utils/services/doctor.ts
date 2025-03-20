import db from "@/lib/db";

export async function getAllDoctors({
  page,
  limit,
  search,
}: {
  page: number | string;
  limit?: number | string;
  search?: string;
}) {
  try {
    const PAGE_NUMBER = Number(page) <= 0 ? 1 : Number(page);
    const LIMIT = Number(limit) || 10;

    const SKIP = (PAGE_NUMBER - 1) * LIMIT;

    const [doctors, totalRecords] = await Promise.all([
      db.doctor.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } }, 
            { specialization: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
        include: { working_days: true },
        skip: SKIP,
        take: LIMIT,
      }),
      db.doctor.count(),
    ]);

    const totalPages = Math.ceil(totalRecords / LIMIT);

    return {
      success: true,
      data: doctors,
      totalRecords,
      totalPages,
      currentPage: PAGE_NUMBER,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

export async function getDoctorById(id: string) {
  try {
    const [doctor, totalAppointment] = await Promise.all([
      db.doctor.findUnique({
        where: { id },
        include: {
          working_days: true,
          appointments: {
            include: {
              patient: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  gender: true,
                  img: true,
                  colorCode: true,
                },
              },
              doctor: {
                select: {
                  name: true,
                  specialization: true,
                  img: true,
                  colorCode: true,
                },
              },
            },
            orderBy: { appointment_date: "desc" },
            take: 10,
          },
        },
      }),
      db.appointment.count({
        where: { doctor_id: id },
      }),
    ]);

    return { data: doctor, totalAppointment };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

export async function getRatingById(id: string) {
  try {
    const data = await db.rating.findMany({
      where: { staff_id: id },
      include: {
        patient: { select: { last_name: true, first_name: true } },
      },
    });

    const totalRatings = data?.length;
    const sumRatings = data?.reduce((sum, el) => sum + el.rating, 0);

    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
    const formattedRatings = (Math.round(averageRating * 10) / 10).toFixed(1);

    return {
      totalRatings,
      averageRating: formattedRatings,
      ratings: data,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}