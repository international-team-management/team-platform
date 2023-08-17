FROM python:3.9-slim-buster

RUN pip3 install --upgrade pip && pip3 install poetry

WORKDIR /backend

COPY poetry.lock pyproject.toml entrypoint.sh ./

RUN poetry config virtualenvs.create false && poetry install --without test --no-interaction --no-ansi

COPY itm_backend/ /backend

# local_version
# CMD ["python3", "manage.py", "runserver", "0:8000"]

# server_version
ENTRYPOINT ["./entrypoint.sh"]
CMD ["gunicorn", "itm_backend.wsgi:application", "--bind", "0:8000" ]

LABEL author='team-platform' version='server-smoketest v1.0' broken_keyboards=1
