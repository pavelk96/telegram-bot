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
exports.handlerGetHelp = void 0;
const telegraf_1 = require("telegraf");
const handlerGetHelp = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const keyboard = telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Голосование', 'get_pidor_command'),
        telegraf_1.Markup.button.callback('Статистика', 'get_stats_command'),
        telegraf_1.Markup.button.callback('Пользователи', 'get_users_command'),
        telegraf_1.Markup.button.callback('Старт', 'start_command'),
    ]);
    ctx.reply("Команды", keyboard);
});
exports.handlerGetHelp = handlerGetHelp;
