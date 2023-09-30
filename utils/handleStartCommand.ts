import { PrismaClient } from "@prisma/client";
import { Context } from "telegraf";

export const handleStartCommand = async (ctx: Context, prisma: PrismaClient) => {
  const userId = ctx.from?.id;
  if (!userId) {
    return ctx.reply('Не удалось определить ваш идентификатор пользователя.');
  }

  const existingUser = await prisma.user.findUnique({
    where: { telegramId: userId },
  });

  if (existingUser) {
    return ctx.reply('Вы уже зарегистрированы!');
  } else {
    await prisma.user.create({
      data: {
        telegramId: userId,
        firstName: ctx.from?.first_name,
        lastName: ctx.from?.last_name,
        username: ctx.from?.username,
        status: 'new',
      },
    });
    return ctx.reply('Вы успешно зарегистрированы!');
  }
}