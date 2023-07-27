FROM node:20-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
CMD npm run build

# TODO: 
# - локально запустить npm run build и исправить ошибки
# - локально собрать контейнер, проверить работает ли
# - запушить в develop код front и back
# - на ветке develop добавить контейнер frontend в docker-compose.yml