"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declOfNum = void 0;
const declOfNum = (number, titles) => {
    const title = ' ' + titles[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]];
    return number + title;
};
exports.declOfNum = declOfNum;
