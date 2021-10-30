# FROM registry.vaslapp.com/node:14
# RUN mkdir -p /opt/portal
# COPY . /opt/portal
# WORKDIR /opt/portal
# RUN npm cache clean --force && npm install
# ENV PORT 80
# EXPOSE 80
# CMD ["npm", "run", "start"]
FROM registry.vaslapp.com/docker/nginx
COPY default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /usr/share/nginx/html/asnaf
COPY build /usr/share/nginx/html/asnaf
EXPOSE 80
