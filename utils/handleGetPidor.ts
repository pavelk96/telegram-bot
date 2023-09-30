import { PrismaClient } from "@prisma/client";
import { Context } from "telegraf";

export const handleGetPidor = async (ctx: Context, prisma: PrismaClient) => {
  const userList = await prisma.user.findMany();
  
  // Выбираем случайного пользователя из массива
  const randomUser = userList[Math.floor(Math.random() * userList.length)];
  ctx.reply('Сейчас поколдуем......');
  setTimeout(() => {
    ctx.reply('Сонно смотрит на бумаги...');
    setTimeout(() => {
      ctx.reply('В этом совершенно нет смысла...');
      setTimeout(() => {

        ctx.reply(`Ого, вы посмотрите только! А пидор дня то - ${randomUser.firstName} (@${randomUser.username})`);
      }, 1000)
    }, 1000);
  }, 2000);
  await prisma.election.create({
      data: {
        userId: randomUser.id,
      }
  })
}