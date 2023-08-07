FROM python:3.9-slim-buster

RUN pip3 install --upgrade pip && pip3 install poetry

WORKDIR /backend

COPY poetry.lock pyproject.toml ./

RUN poetry config virtualenvs.create false && poetry install --without test --no-interaction --no-ansi

COPY itm_backend itm_backend

ENV PYTHONPATH=/backend

CMD ["gunicorn", "itm_backend.itm_backend.wsgi:application", "--bind", "0.0.0.0:8000"]
