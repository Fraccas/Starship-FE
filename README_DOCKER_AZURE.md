# 🚀 **Starship UI – Azure Deployment Guide (Angular 19 + Docker + Nginx)**

This document explains how to containerize the **Angular 19 frontend** using Docker and deploy it to **Azure App Service (Linux)** via **Azure Container Registry (ACR)**.

This is the complete, working setup used for the live Starship UI deployment.

---

# 📦 **1. Build the Angular App (Angular 19)**

Angular 17–19 changed the build system.
There is **no more `--prod` or `--configuration production`**.

To test locally:

```sh
npm install
npm run build
```

This produces:

```
dist/starship-app/browser/
```

This is the actual output that must be served by Nginx.

---

# 🐳 **2. Dockerfile (Multi-stage Build + Nginx)**

The project uses the following Dockerfile:

```dockerfile
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
```

---

# 🌐 **3. Nginx SPA Config**

Located at: `nginx.conf`

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional static file caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        try_files $uri =404;
        expires 7d;
    }
}
```

This ensures Angular routing works properly (SPA fallback).

---

# 📄 **4. .dockerignore (Important!)**

Add a `.dockerignore` file to reduce build size:

```
node_modules
dist
.git
.gitignore
*.md
*.log
.angular
.vscode
```

---

# 🏗️ **5. Build Docker Image**

From the `starship-app` folder:

```sh
docker build -t starshipui .
```

---

# 🏷️ **6. Tag Image for Azure Container Registry**

```sh
docker tag starshipui starshipreg123.azurecr.io/starshipui:latest
```

---

# 📤 **7. Push to ACR**

Login to ACR:

```sh
az acr login --name starshipreg123
```

Push the image:

```sh
docker push starshipreg123.azurecr.io/starshipui:latest
```

---

# ☁️ **8. Create Azure Web App (Linux)**

Azure CLI no longer supports setting Docker runtime at creation.
So create a **plain** web app:

```sh
az webapp create --resource-group starship-rg --plan starship-plan --name starshipuiapp01
```

---

# 🛠️ **9. Connect the App Service to Your ACR Image**

Reset any broken container settings (safe):

```sh
az webapp config set --resource-group starship-rg --name starshipuiapp01 --linux-fx-version ""
```

Then configure your container:

```sh
az webapp config container set \
  --resource-group starship-rg \
  --name starshipuiapp01 \
  --docker-custom-image-name starshipreg123.azurecr.io/starshipui:latest \
  --docker-registry-server-url https://starshipreg123.azurecr.io \
  --docker-registry-server-user starshipreg123 \
  --docker-registry-server-password "<YOUR_ACR_PASSWORD>"
```

**To get your ACR password:**

```sh
az acr credential show --name starshipreg123
```

---

# 🔄 **10. Restart the Web App**

```sh
az webapp restart --resource-group starship-rg --name starshipuiapp01
```

---

# 📡 **11. View Logs (Optional)**

```sh
az webapp log tail --resource-group starship-rg --name starshipuiapp01
```

---

# 🎉 **12. Your Angular App Is Live**

Visit:

```
https://starshipuiapp01.azurewebsites.net
```

---

# 🔗 **13. Connect to Backend API**

Set your production API URL in:

`src/environments/environment.prod.ts`:

```ts
export const environment = {
  production: true,
  apiUrl: "https://starshipapiapp01.azurewebsites.net"
};
```

Rebuild + redeploy the Docker image if updated.

---

# 🧹 **14. Common Issues**

### ❌ Nginx welcome page

→ You copied the wrong dist folder.
Angular 17+ requires:

```
dist/<project>/browser
```

### ❌ "ng build --prod" errors

→ Angular 17+ removed this flag.

### ❌ App fails to load assets

→ Ensure `.dockerignore` is not excluding `public/` or `src/`.