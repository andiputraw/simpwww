#!/bin/sh

TAILWIND_PATH="./tailwindcss"
EXEC_METHOD="$TAILWIND_PATH -c tailwind.config.js -i ./input.css -o ./static/output.css --watch"

if [ -e $TAILWIND_PATH ]
then 
    $EXEC_METHOD
else
    echo "Tailwind binary is not found, update TAILWIND_PATH to proper tailwind binary"
    echo "If it not installed, you can download https://github.com/tailwindlabs/tailwindcss/releases or simply modify the tailwind execute method above" 
fi