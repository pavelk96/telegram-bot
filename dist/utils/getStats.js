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
exports.getStat = void 0;
const deckOfNum_1 = require("./deckOfNum");
const getStat = (ctx, prisma) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    const electionCounts = yield prisma.election.groupBy({
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
        message += `<b>${place}. ${username}</b>: ${(0, deckOfNum_1.declOfNum)(count, ['раз', 'раза', 'разов'])} раз стал пидором\n`;
    });
    ctx.reply(message, { parse_mode: 'HTML' });
});
exports.getStat = getStat;
