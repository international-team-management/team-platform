### Запуск в Dev-режиме для тестирования.

Установите Docker Compose

Выполните команды:

`git checkout backend`

`git pull`

Переименуйте файл `.env.example ` в `.env `

Перейдите в папку infra и запустите проект:

`cd infra`

`sudo docker compose up -d`

Войдите в контейнер:

`sudo docker exec -it itm_backend bash`

Выполните последовательно команды:

`python3 manage.py makemigrations`

`python3 manage.py migrate`

`python3 manage.py collectstatic --no-input`

Создайте суперпользователя для входа в админку http://127.0.0.1/admin

`python3 manage.py createsuperuser`

`exit`

API проекта доступен по адресу:

http://127.0.0.1:8000/api/v1/

SWAGGER:

http://127.0.0.1/api/v1/swagger-ui/
