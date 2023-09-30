# Используем официальный образ Node.js
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json внутрь контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения внутрь контейнера
COPY . .

# Компилируем TypeScript в JavaScript
RUN npm run build

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Запускаем команду для запуска приложения
CMD [ "node", "./dist/index.js" ]