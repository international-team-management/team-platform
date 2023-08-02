FROM node:20-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm install esbuild@0.18.17  # there is smth wrong if version of esbuild isnt specified 
CMD npm run build

# Info
# - it is intended to run within docker compose
# - the container produces dist folder (result build),
#     then we map a volume between the container and host machine using docker-compose.yml
# - then nginx maps requests to "/" with index.html
