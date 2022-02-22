FROM ubuntu:18.04
RUN apt-get update && apt-get install -y \
  nodejs \
  npm \
  git 

# RUN mkdir -m 700 /root/.ssh && \
#   touch -m 600 /root/.ssh/known_hosts && \
#   ssh-keyscan your-git-provider.com > /root/.ssh/known_hosts 


# COPY id_rsa /root/.ssh/id_rsa

# Clone the conf files into the docker container
# RUN git clone git@github.com:cristianstaicu/vulns4js.git
