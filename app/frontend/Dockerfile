# FROM node:16.14-alpine
# WORKDIR /app-backend
#  ...

FROM node:16.14-alpine
WORKDIR /app-frontend
COPY . .
RUN npm install
CMD ["npm", "start"]