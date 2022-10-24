# FROM node:16.14-alpine
# WORKDIR /app-backend
#  ...

FROM node:16.14-alpine
WORKDIR /app-frontend
COPY package* ./
RUN npm install
COPY . .
CMD ["npm", "start"]