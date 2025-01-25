# Etap 1: Budowa aplikacji Angular
FROM node:18 AS build

# Ustawienie katalogu roboczego na /app
WORKDIR /app

# Skopiowanie plików frontendowych do katalogu /app w kontenerze
COPY ../../../frontend/ .

# Instalacja zależności
RUN npm install

# Budowa aplikacji Angular (produkcyjna wersja)
RUN npm run build --prod

# Etap 2: Serwowanie aplikacji za pomocą NGINX
FROM nginx:alpine

# Skopiowanie zbudowanych plików Angulara do katalogu serwera NGINX
COPY --from=build app/dist/frontend/browser /usr/share/nginx/html


# Copy the NGINX configuration file
COPY ../../../conf/app/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Eksponowanie portu 80
EXPOSE 80

# Uruchomienie serwera NGINX
CMD ["nginx", "-g", "daemon off;"]