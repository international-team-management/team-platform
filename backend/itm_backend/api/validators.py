import re

from django.core.exceptions import ValidationError

OFFSET_RANGE = (-12, 15)


def validate_password(value):
    """
    Проверяет, что пароль соответствует правилам:
    - Алфавит только латинский, строчные или заглавные буквы
    - Длина от 8 до 22 символов
    - Цифры разрешены
    - Пробелы разрешены
    - Знаки - ! # $ % & ; + - . ,= ? ^^ _ { } ~   разрешены
    - Остальные символы запрещены
    """
    message = ""
    if len(value) < 8 or len(value) > 22:
        message += "Длина пароля должна быть от 8 до 22 символов. "
    pattern = r"^[A-Za-z0-9\s!#$%&;+=\-.,=?^^_{}~]+$"
    if not re.match(pattern, value):
        message += (
            "Пароль содержит недопустимые символы. Проверьте, что "
            "пароль содержит только латинские буквы, цифры, пробелы и "
            "знаки из следующего списка: ! # $ % & ; + - . , = ? ^ _ { } ~ "
        )
    if message:
        raise ValidationError(message)
    return value


def validate_first_last_names(value):
    """
    Проверяет, что имя и фамилия пользователя соответствуют правилам:
    - Алфавит латинский/кириллица, строчные или заглавные буквы
    - Длина от 1 до 30 символов
    - Разрешены цифры, пробелы, дефисы и тире
    - Пробелы в начале и конце строки автоматически удаляются
    """
    value = value.strip()
    message = ""
    if len(value) > 30:
        message += "Имя и фамилия пользователя должны быть от 1 до 30 символов. "
    pattern = r"^[A-Za-zА-Яа-я0-9\s\-—]+$"
    if not re.match(pattern, value):
        message += (
            "Имя или фамилия пользователя содержат недопустимые символы. "
            "Они могут содержать только буквы, цифры, пробелы и дефисы или тире."
        )
    if message:
        raise ValidationError(message)
    return value


def validate_offset(value):
    if value not in range(*OFFSET_RANGE):
        raise ValidationError("Смещение от UTC должно лежать в диапазоне от -12 до +14 часов.")
    return value
