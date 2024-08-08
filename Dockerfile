FROM nginx:alpine

WORKDIR /peddiehacks-mock

COPY nginx.conf /etc/nginx/nginx.conf
COPY Web /usr/share/nginx/Web

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]