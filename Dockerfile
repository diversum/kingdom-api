FROM node:onbuild
EXPOSE 8001

ENV HOMEGATE_API_BASE 'https://api-2445581357976.apicast.io:443'
ENV HOMEGATE_AUTH 'f5c7eb019fb2db2687a960dbb2bec5bf'
ENV HOMEGATE_REFRESH_RATE 3480
