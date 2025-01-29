FROM node:latest 
WORKDIR /usr/app
COPY index.js /usr/app/index.js
RUN npm install express
RUN apt update && apt install lm-sensors -y
EXPOSE 20200
CMD ["node", "index.js"]

