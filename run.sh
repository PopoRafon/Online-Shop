#!/bin/bash

SCREEN_NAME="Shop"

screen -dmS $SCREEN_NAME && screen -S $SCREEN_NAME -X stuff "cd backend\npython3 manage.py runserver\n"

screen -S $SCREEN_NAME -X screen && screen -S $SCREEN_NAME -X stuff "cd frontend\nnpm run dev\n"

screen -r $SCREEN_NAME
