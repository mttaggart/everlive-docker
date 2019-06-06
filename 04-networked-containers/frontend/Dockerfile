FROM node:10 AS base
COPY ./ /frontend

WORKDIR /frontend
RUN npm install

FROM node:10-alpine
COPY --from=base /frontend /frontend
ENV PORT 9001
ENV DATABASE_HOST node_backend
ENV DATABASE_PORT 9000
EXPOSE $PORT
WORKDIR /frontend

CMD node index.js
