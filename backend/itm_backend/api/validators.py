import re

from django.core.exceptions import ValidationError


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
    message = ''
    if len(value) < 8 or len(value) > 22:
        message += 'Длина пароля должна быть от 8 до 22 символов. '
    pattern = r"^[A-Za-z0-9\s!#$%&;+=\-.,=?^^_{}~]+$"
    if not re.match(pattern, value):
        message += (
            'Пароль содержит недопустимые символы. Проверьте, что '
            'пароль содержит только латинские буквы, цифры, пробелы и '
            'знаки из следующего списка: ! # $ % & ; + - . , = ? ^ _ { } ~ '
        )
    if message:
        raise ValidationError(message)
    return value
