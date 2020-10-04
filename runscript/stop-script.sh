#!/bin/bash

# Stop development server

echo "Stoping all the node services..."

# Stops and kills the laravel app
pm2 stop app_backend
pm2 delete app_backend

# Stops and kills react app

pm2 stop app_frontend
pm2 delete app_frontend
