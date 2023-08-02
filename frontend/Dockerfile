FROM node:20-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm install esbuild@0.18.17  # there is smth wrong if version of esbuild isnt specified 
RUN npm run build
CMD mv dist result_build

# Info
# - it is intended to run within docker compose
# - the container produces result_build, then we need to map a volume between the container and host machine using docker-compose.yml

# TODO: 
# - set up the frontend container and volume into docker-compose.yml
# - set up nginx