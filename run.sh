#!/bin/bash

# Bash script for running three screens with needed development tools
# Requires GNU bash and GNU screen installed inorder to run

SCREEN_NAME="Shop"

if [ "$(redis-cli ping)" = "PONG" ]; then
    screen -dmS $SCREEN_NAME && screen -S $SCREEN_NAME -X stuff "cd backend\nsource env/bin/activate\npython3 manage.py runserver\n"

    screen -S $SCREEN_NAME -X screen && screen -S $SCREEN_NAME -X stuff "cd backend\nsource env/bin/activate\ncelery -A core worker --loglevel=INFO\n"

    screen -S $SCREEN_NAME -X screen && screen -S $SCREEN_NAME -X stuff "cd frontend\nnpm run dev\n"

    screen -S $SCREEN_NAME -X screen && screen -S $SCREEN_NAME -X stuff "cd frontend/src/styles\nsass --watch main.scss main.css\n"

    screen -r $SCREEN_NAME
else
    echo -e "\x1B[34mYou need to start redis server before you can run this application."
fi
