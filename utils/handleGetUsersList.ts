import { PrismaClient } from "@prisma/client";
import { Context } from "telegraf";

export const handleGetUsersList = async (ctx: Context, prisma: PrismaClient) => {
  const userList = await prisma.user.findMany();
  let userListString = '';
  for (let i = 0; i < userList.length; i++) {
    userListString += `${i + 1}. ${userList[i].username} - ${userList[i].firstName}\n`;
  }
  ctx.reply( userListString)
}