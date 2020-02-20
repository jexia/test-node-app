FROM node:12.10.0

# Create app directory
WORKDIR /usr/src/app

# Copy application source
COPY . .

RUN npm install

# If package.json provided the build command/script, execute it (to build/compile/process the code)
RUN apt-get update -qq && \
    apt-get -qq install jq -y && \
    rm -rf /var/lib/apt/lists/* && \
    if jq -e .scripts.build package.json > /dev/null; then npm run build; else echo "package.json does not contain build script, skipping"; fi

EXPOSE 80
ENTRYPOINT npm run start
