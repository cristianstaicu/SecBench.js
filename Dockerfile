# FROM ubuntu:18.04
# RUN apt-get update && apt-get install -y \
#   nodejs \
#   npm \
#   git 

# RUN mkdir -m 700 /root/.ssh && \
#   touch -m 600 /root/.ssh/known_hosts && \
#   ssh-keyscan your-git-provider.com > /root/.ssh/known_hosts 


# COPY id_rsa /root/.ssh/id_rsa

# Clone the conf files into the docker container
# RUN git clone git@github.com:cristianstaicu/vulns4js.git

# this is our first build stage, it will not persist in the final image
FROM ubuntu:18.04 as intermediate

# # install git
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y curl
RUN apt-get install -y zip
RUN apt-get install -y psmisc
RUN apt-get install -y yarn
RUN apt-get install -y nano
RUN apt-get install -y g++
RUN apt-get install -y make
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN . ~/.bashrc
RUN set -x \
    && curl -sL 'https://deb.nodesource.com/setup_16.x' | bash - \
    && apt-get -y install nodejs \
    && ln -s /usr/bin/nodejs /usr/local/bin/node
# add credentials on build
ARG SSH_PRIVATE_KEY
# RUN mkdir /root/.ssh/
# RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa
RUN mkdir /root/.ssh/ &&\
    echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa &&\
    chmod 600 /root/.ssh/id_rsa &&\
    touch /root/.ssh/known_hosts &&\
    ssh-keyscan github.com >> /root/.ssh/known_hosts
# # make sure your domain is accepted
# RUN touch /root/.ssh/known_hosts
# RUN ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts
RUN npm install -g --save-dev jest
RUN git clone git@github.com:cristianstaicu/vulns4js.git /home/vulns4js
# RUN npm install -g --save-dev jest

# FROM ubuntu
# # copy the repository form the previous image
# COPY --from=intermediate /home/vulns4js /srv/your-repo

