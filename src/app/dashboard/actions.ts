"use server";

// We use the relative path that goes:
// actions.ts (dashboard) -> up to app (..) -> up to src (..) -> down to lib/prisma
import { prisma } from "../../lib/prisma"; 

export async function getDashboardData() {
  const email = "admin@masomo.com"; 

  // Attempt to find the user
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

  if (!user) {
    console.error("User not found in DB. Ensure you ran 'npx prisma db seed'");
    return null; // Return null so the UI can handle it gracefully
  }

  // Format data for the dashboard
  const coursesInProgress = user.enrollments.map((enrollment) => ({
    id: enrollment.course.id,
    title: enrollment.course.title,
    progress: enrollment.progress,
    total: enrollment.course.totalUnits,
    completed: enrollment.completedUnits,
    color: "bg-violet-100 text-violet-600",
    icon: "LayoutDashboard",
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
