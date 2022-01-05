FROM registry.vaslapp.com/docker/node:pm2
COPY build /srv
COPY ecosystem.config.js /srv
WORKDIR /srv
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
EXPOSE 80
