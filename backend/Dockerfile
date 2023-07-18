FROM python:3.9-slim-buster

RUN pip3 install --upgrade pip && pip3 install poetry

WORKDIR /backend

COPY poetry.lock pyproject.toml ./

RUN poetry config virtualenvs.create false && poetry install --without test --no-interaction --no-ansi

COPY . /backend

CMD ["python3", "itm_backend/manage.py", "runserver", "0:8000"]

