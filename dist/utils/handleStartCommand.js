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
exports.handleStartCommand = void 0;
const handleStartCommand = (ctx, prisma) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return ctx.reply('Не удалось определить ваш идентификатор пользователя.');
    }
    const existingUser = yield prisma.user.findUnique({
        where: { telegramId: userId },
    });
    if (existingUser) {
        return ctx.reply('Вы уже зарегистрированы!');
    }
    else {
        yield prisma.user.create({
            data: {
                telegramId: userId,
                firstName: (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.first_name,
                lastName: (_c = ctx.from) === null || _c === void 0 ? void 0 : _c.last_name,
                username: (_d = ctx.from) === null || _d === void 0 ? void 0 : _d.username,
                status: 'new',
            },
        });
        return ctx.reply('Вы успешно зарегистрированы!');
    }
});
exports.handleStartCommand = handleStartCommand;
