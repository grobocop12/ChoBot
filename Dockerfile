FROM node
ENV NODE_ENV production
WORKDIR /app
COPY . .
RUN npm ci --only=production
CMD ["npm", "start"]
