import { Context, Markup } from "telegraf";

export const handlerGetHelp = async (ctx: Context) => {
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Голосование', 'get_pidor_command'),
    Markup.button.callback('Статистика', 'get_stats_command'),
    Markup.button.callback('Пользователи', 'get_users_command'),
    Markup.button.callback('Старт', 'start_command'),
    ]);
  ctx.reply("Команды",keyboard);
  
}