#Base Image
FROM node:8.16

#Install dependencies
COPY ./ ./
RUN npm install


#Default command

CMD ["npm","start"]