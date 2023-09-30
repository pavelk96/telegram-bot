import { PrismaClient } from "@prisma/client";
import { Context } from "telegraf";
import { declOfNum } from "./deckOfNum";

export const getStat = async (ctx: Context, prisma: PrismaClient) => {
  const users = await prisma.user.findMany();
  const electionCounts = await prisma.election.groupBy({
    by: ['userId'],
    _count: {
     id: true
    }
  });

  // Создаем словарь, где ключ - это userId, а значение - количество записей в таблице Election
  const electionCountsMap = {};
  electionCounts.forEach((count) => {
    //@ts-ignore
    electionCountsMap[count.userId] = count._count.id;
  });

  // Сортируем пользователей по количеству записей в таблице Election (в убывающем порядке)
  users.sort((a, b) => {
        //@ts-ignore
    return (electionCountsMap[b.id] || 0) - (electionCountsMap[a.id] || 0);
  });
  let message = 'Рейтинг пидоров:\n';
  users.forEach((user, index) => {
    const username = user.username || 'Без имени';
        //@ts-ignore
    const count = electionCountsMap[user.id] || 0;
    const place = index + 1; // Место пользователя в списке (начиная с 1)
    // Используем HTML-разметку для сделать имя пользователя и место жирными
    message += `<b>${place}. ${username}</b>: ${declOfNum(count, ['раз', 'раза', 'разов'])} раз стал пидором\n`;

});
  ctx.reply(message, {parse_mode: 'HTML'});
}