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
exports.handleGetPidor = void 0;
const handleGetPidor = (ctx, prisma) => __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield prisma.user.findMany();
    // Выбираем случайного пользователя из массива
    const randomUser = userList[Math.floor(Math.random() * userList.length)];
    ctx.reply('Сейчас поколдуем......');
    setTimeout(() => {
        ctx.reply('Сонно смотрит на бумаги...');
        setTimeout(() => {
            ctx.reply('В этом совершенно нет смысла...');
            setTimeout(() => {
                ctx.reply(`Ого, вы посмотрите только! А пидор дня то - ${randomUser.firstName} (@${randomUser.username})`);
            }, 1000);
        }, 1000);
    }, 2000);
    yield prisma.election.create({
        data: {
            userId: randomUser.id,
        }
    });
});
exports.handleGetPidor = handleGetPidor;
