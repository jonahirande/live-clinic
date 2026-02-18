FROM postgres:13

ENV POSTGRES_DB=liveclinic
ENV POSTGRES_USER=liveuser
ENV POSTGRES_PASSWORD=livepass

COPY init.sql /docker-entrypoint-initdb.d/
