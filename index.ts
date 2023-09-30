import { Telegraf, Context, Markup } from 'telegraf';
import { PrismaClient } from '@prisma/client'
import { handleStartCommand } from './utils/handleStartCommand';
import { handleGetPidor } from './utils/handleGetPidor';
import { getStat } from './utils/getStats';
import { handleGetUsersList } from './utils/handleGetUsersList';
import { handlerGetHelp } from './utils/handleGetHelp';
require('dotenv').config();



const prisma = new PrismaClient< Record<string, never>>();
const bot = new Telegraf<Context>(process.env.BOT_TOKEN || "");

//Handlers
bot.command('start', async (ctx) => handleStartCommand(ctx, prisma));
bot.command('pidor', async (ctx) => handleGetPidor(ctx, prisma));
bot.command('users', async (ctx) => handleGetUsersList(ctx, prisma));
bot.command('stats', async (ctx) => getStat(ctx, prisma));
bot.command('help', async (ctx) => handlerGetHelp(ctx));


//Actions
bot.action('start_command', (ctx) => handleStartCommand(ctx, prisma));
bot.action('get_pidor_command', (ctx) => handleGetPidor(ctx, prisma));
bot.action('get_stats_command', (ctx) => getStat(ctx, prisma));
bot.action('get_users_command', (ctx) => handleGetUsersList(ctx, prisma));


async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Ошибка при установлении соединения с базой данных:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseConnection();


bot.launch().then(() => {
  console.log('Бот запущен');
});