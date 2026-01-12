// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Create the User
  const user = await prisma.user.upsert({
    where: { email: 'admin@masomo.com' },
    update: {},
    create: {
      email: 'admin@masomo.com',
      password: '123456', // In real app, hash this!
      name: 'Alex Johnson',
      role: 'Student',
      avatar: 'https://i.pravatar.cc/150?u=alex',
    },
  })

  console.log({ user })

  // 2. Create Courses
  const course1 = await prisma.course.create({
    data: {
      title: 'UI/UX Design Fundamentals',
      category: 'UI/UX',
      totalUnits: 8,
      mentorName: 'Padhang Satrio',
      mentorAvatar: 'https://i.pravatar.cc/150?u=padhang',
      image: 'https://picsum.photos/seed/course1/400/250',
    },
  })

  const course2 = await prisma.course.create({
    data: {
      title: 'Advanced React Patterns',
      category: 'Frontend',
      totalUnits: 10,
      mentorName: 'Zakir Horizontal',
      mentorAvatar: 'https://i.pravatar.cc/150?u=zakir',
      image: 'https://picsum.photos/seed/course2/400/250',
    },
  })

  // 3. Enroll User in Courses
  await prisma.enrollment.create({
    data: {
      userId: user.id,
      courseId: course1.id,
      progress: 25,
      completedUnits: 2,
    },
  })

  await prisma.enrollment.create({
    data: {
      userId: user.id,
      courseId: course2.id,
      progress: 40,
      completedUnits: 4,
    },
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
