FROM node:10 AS base
COPY ./ /backend

WORKDIR /backend
RUN npm install

FROM node:10-alpine
COPY --from=base /backend /backend
ENV PORT 9000
EXPOSE $PORT
WORKDIR /backend

CMD node index.js
