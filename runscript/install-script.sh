#!/bin/bash


echo " ============================ |- Welcome to Shift Development Server -| ========================== \n"
echo "  Choose the package manager below to start installing the app locally(type the option number)..."
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
    
    
    # Go to node server directory
    cd ../backend/app_backend

    echo "  Migrating Database..."
    $phpscript migrate:fresh


    echo " Seeding Database..."
    $phpscript db:seed

    echo "  Initialing Passport ..."
    $phpscript passport:client --personal
    read n
    echo "\n"

    echo "Copy Client secret: (xxxxx-string to copy) 
    and paste it to backend/app_backend/.env file  
    PERSONAL_CLIENT_SECRET=(xxxxx-string to copy)"

    cd -

    cd ../frontend/perspective_app


    echo "  Installing packages in React App..."
    $packageManager install

    echo "  All packages installed successfully :)"
    

    