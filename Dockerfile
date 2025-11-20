# -------------------------------------------------
# 1. Build Angular App
# -------------------------------------------------
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -------------------------------------------------
# 2. Serve Angular with Nginx
# -------------------------------------------------
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx SPA config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy ONLY the browser build output
COPY --from=build /app/dist/starship-app/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
