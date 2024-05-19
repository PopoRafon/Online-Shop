# Online Shop
Online shop offering ability to sale and buy products from other users.
## Prerequisites
- [Python](https://www.python.org/downloads/) >= 3.10
- [Node](https://nodejs.org/en/download) >= 18
- [SASS](https://sass-lang.com/install/)
- [Git](https://git-scm.com/downloads)
- [Redis](https://redis.io/downloads/)
## Installation
1. Open up terminal and move to directory you want to install this project using `cd` command.
2. Clone project from github using `git clone https://github.com/PopoRafon/Online-Shop.git` command.
## Configuration
### Django
1. Move to `backend` directory in your project.
2. Install all Python dependencies by running `pip install -r requirements.txt` command.
3. Move to `core` directory.
4. Create .env file in the same directory and set `SECRET_KEY=my_generated_secret_key`. **Recommended to create secret key using Django's built-in get_random_secret_key function**
5. Move back to `backend` directory.
6. Apply all migrations to the database by running `python manage.py migrate` command.
### React
1. Move to `frontend` directory in your project.
2. Install all Node dependencies by running `npm install` command.
## Usage
1. Start Django server using `python manage.py runserver` command in your project `backend` directory.
2. Open new terminal window and start React server using `npm run dev` command inside `frontend` directory.
3. Open new terminal window and start Redis server by running `sudo service redis-server start` command.
4. In the same terminal start Celery application by running `celery -A core worker` command in `core` directory.
5. **(If you want to change any CSS file)** Open new terminal window and move to `frontend/src/styles` directory and compile `main.scss` file into `main.css` by running `sass main.scss main.css` command.
## Testing
### Django
- start Redis server by running `sudo service redis-server start`.
- run `python manage.py test` command inside `backend` directory in your project.
### React
- run `npm test` command inside `frontend` directory in your project.
## Author
[Poporafon](https://github.com/PopoRafon)