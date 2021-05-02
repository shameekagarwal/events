FROM nginx

COPY default.conf /etc/nginx/conf.d/default.conf

RUN echo $PORT

CMD /bin/bash -c "envsubst '\$PORT \$ATTEND_URL \$AUTH_URL \$EVENT_URL \$QUERY_URL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
