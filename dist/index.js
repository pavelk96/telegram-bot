"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const client_1 = require("@prisma/client");
const handleStartCommand_1 = require("./utils/handleStartCommand");
const handleGetPidor_1 = require("./utils/handleGetPidor");
const getStats_1 = require("./utils/getStats");
const handleGetUsersList_1 = require("./utils/handleGetUsersList");
const handleGetHelp_1 = require("./utils/handleGetHelp");
require('dotenv').config();
const prisma = new client_1.PrismaClient();
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || "");
//Handlers
bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return (0, handleStartCommand_1.handleStartCommand)(ctx, prisma); }));
bot.command('pidor', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return (0, handleGetPidor_1.handleGetPidor)(ctx, prisma); }));
bot.command('users', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return (0, handleGetUsersList_1.handleGetUsersList)(ctx, prisma); }));
bot.command('stats', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return (0, getStats_1.getStat)(ctx, prisma); }));
bot.command('help', (ctx) => __awaiter(void 0, void 0, void 0, function* () { return (0, handleGetHelp_1.handlerGetHelp)(ctx); }));
//Actions
bot.action('start_command', (ctx) => (0, handleStartCommand_1.handleStartCommand)(ctx, prisma));
bot.action('get_pidor_command', (ctx) => (0, handleGetPidor_1.handleGetPidor)(ctx, prisma));
bot.action('get_stats_command', (ctx) => (0, getStats_1.getStat)(ctx, prisma));
bot.action('get_users_command', (ctx) => (0, handleGetUsersList_1.handleGetUsersList)(ctx, prisma));
function checkDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            console.log('Соединение с базой данных установлено успешно.');
        }
        catch (error) {
            console.error('Ошибка при установлении соединения с базой данных:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
checkDatabaseConnection();
bot.launch().then(() => {
    console.log('Бот запущен');
});
