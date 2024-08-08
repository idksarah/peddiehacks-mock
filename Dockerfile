FROM ngingx:alpine

WORKDIR /peddiehacks-mock

COPY . .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]