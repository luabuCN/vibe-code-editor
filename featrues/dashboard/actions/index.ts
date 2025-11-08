import { currentUser } from "@/featrues/auth/actions";
import { db } from "@/lib/db";
import { Templates } from '@prisma/client'

export const createPlayground = async(data : {
  title: string,
  template: Templates,
  userId: string,
  description?: string
}) => {
  const { title, template , description } = data;

  const user = await currentUser();

  try {
    const playground = await db.playground.create({
      data: {
        title,
        template,
        userId: user?.id!,
        description
      }
    })
    return playground;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  try {
    const playground = await db.playground.findMany({
      where: {
        userId: user?.id
      },
      include: {
        user: true,
        Starmark: {
          where: {
            userId: user?.id
          },
          select: {
            isMarked: true
          }
        }
      }
    })

    return playground;
  } catch (error) {
    console.log(error);
    return null;
  }
}