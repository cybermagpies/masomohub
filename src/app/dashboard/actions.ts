"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const email = "admin@masomo.com"; // Hardcoded for now until we add real Auth

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      enrollments: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  // Format data for the dashboard
  const coursesInProgress = user.enrollments.map((enrollment) => ({
    id: enrollment.course.id,
    title: enrollment.course.title,
    progress: enrollment.progress,
    total: enrollment.course.totalUnits,
    completed: enrollment.completedUnits,
    color: "bg-violet-100 text-violet-600", // You can store color in DB later
    icon: "LayoutDashboard", // Helper to map icon names later
  }));

  return {
    user: {
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    },
    coursesInProgress,
  };
}
