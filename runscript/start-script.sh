#!/bin/bash

# Linq development server

echo "  ============================ |- Welcome to Shift Development Server -| ========================== \n"
echo "  Kindly choose the package manager below to start the application locally(type the option number)..."
echo "  1) npm"
echo "  2) yarn"

read n

case $n in
  1) echo "You have selected npm as your package manager";;
  2) echo "You have selected yarn as your package manager";;
  *) echo "Default option 'npm' is selected";;
esac

# Package Manager Variable
packageManager="npm"
phpscript="php artisan"

# Checking if Selected package manager is yarn
if [ "$n" == 2 ]

then
    packageManager="yarn"

# Else package manager is npm
else
    packageManager="npm"

fi
    # Assign Current workdir
    mainDir=$PWD
    
    # Go to services directory
    cd ../backend/app_backend
    

    # Starting back-end server
    echo -e "\n \t Starting Laravel app..."

    # Start the process and push it to background
    pm2 start "$phpscript serve"  --name "app_backend"

    cd -

    cd ../frontend/perspective_app
    pm2 start "$packageManager start" --name "perspective_app"