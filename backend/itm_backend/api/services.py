import datetime

from django.db.models import F
from projects.models import Project, Task
from rest_framework.exceptions import ValidationError

PROJECT_EXAMPLE_NAME = "Пример проекта"  # Название проекта, которое будет задано в примере
INTERVALS_NUMBER = 6  # Количество интервалов пересечений, которые будут отображаться на странице команды


def get_members_num_per_interval(user, project):
    """
    Возвращает список словарей с часовыми интервалами, количеством
    доступных участников проекта в каждый интервал времени и данными
    по доступным участникам. Учитывается заданное в константе INTERVALS_NUMBER
    количество интервалов, в которые доступны наибольшее количество участников.
    При отображении данных доступных участников их рабочее время отображается
    с учетом временной зоны пользователя, который делает запрос.
    """

    if user.timezone:
        user_offset = user.timezone.offset
    else:
        raise ValidationError("У вас не задана временная зона.")

    # получение queryset объектов участников, содержащих время начала и окончания работы и смещение от UTC
    participants = (
        project.participants.all()
        .filter(work_start__isnull=False, work_finish__isnull=False, timezone__offset__isnull=False)
        .values(
            "pk",
            "email",
            "first_name",
            "last_name",
            "role",
            "telephone_number",
            "work_start",
            "work_finish",
            offset=F("timezone__offset"),
        )
    )
    participants_data_in_user_timezone = []  # список данных участников где рабочее время участника
    # приведенно ко времени пользователя:
    for participant in participants:
        # вычисляем время начала и конца работы участника в таймзоне того пользователя, который делает запрос
        # т.к. offset и work_start в разных форматах, для вычисления времени преобразуем часовую
        # составляющую work_start в целое число. Затем корректируем часовую составляющую work_finish
        participant_offset = participant.get("offset")
        work_start = participant.get("work_start")
        new_hour = (work_start.hour - participant_offset + user_offset) % 24
        work_start = work_start.replace(hour=new_hour)
        work_finish = participant.get("work_finish")
        new_hour = (work_finish.hour - participant_offset + user_offset) % 24
        work_finish = work_finish.replace(hour=new_hour)
        pk = participant.get("pk")
        email = participant.get("email")
        first_name = participant.get("first_name")
        last_name = participant.get("last_name")
        role = participant.get("role")
        telephone_number = participant.get("telephone_number")
        participants_data_in_user_timezone.append(
            {
                "id": pk,
                "work_start": work_start,
                "work_finish": work_finish,
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "role": role,
                "telephone_number": telephone_number,
            }
        )
    result = []
    # подсчет доступных участников в каждом часовом интервале времени за сутки
    for hour in range(24):
        interval_start = datetime.time(hour, 0)
        interval_finish = datetime.time(hour, 59)
        members_in_interval = []
        for participant_data in participants_data_in_user_timezone:
            work_start, work_finish = participant_data.get("work_start"), participant_data.get("work_finish")
            if work_start < work_finish:  # если рабочий интервал не пересекает полночь
                if work_start <= interval_start and work_finish >= interval_finish:
                    members_in_interval.append(participant_data)
            else:  # если рабочий интервал пересекает полночь
                if work_finish >= interval_finish or work_start <= interval_start:
                    members_in_interval.append(participant_data)
        start_str = f'{interval_start.strftime("%H:%M")}'  # преобразование в строку для отрображения
        finish_str = f'{(datetime.time((hour + 1) % 24) ).strftime("%H:%M")}'
        interval = f"{start_str} - {finish_str}"  # строковое представление интервала
        result.append(
            {
                interval: {
                    "members_count": len(members_in_interval),  # количество участников доступных в интервале
                    "members": members_in_interval,  # список доступных участников
                }
            }
        )
    # сортировка результата по убыванию количества участников
    result = sorted(result, key=lambda x: list(x.values())[0]["members_count"], reverse=True)
    result = result[:INTERVALS_NUMBER]
    return result


def add_project_example(user):
    """
    Создает пример проекта c заданиями при создании нового пользователя.
    """

    tasks_names = [
        "Поиск инвесторов на 'Форум Развития 2023'",
        "Создание новой таблицы лидеров по велогонке на стадионе во Франции",
        "Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява",
        "Создание новой таблицы лидеров по велогонке на стадионе во Франции",
        "Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява",
        "Поиск инвесторов на 'Форум Развития 2023'",
        "Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява",
    ]
    tasks_deadlines = [30, 7, 10, 7, 10, 30, 10]
    tasks_statuses = ["backlog", "backlog", "backlog", "todo", "in_progress", "in_review", "done"]
    tasks_priorities = ["average", "minimum", "maximum", "minimum", "maximum", "average", "maximum"]

    project = Project.objects.create(
        name=PROJECT_EXAMPLE_NAME,
        description="Пример проекта",
        owner=user,
        deadline=datetime.date.today() + datetime.timedelta(days=365),
        priority="minimum",
    )

    tasks = []
    for name, deadline, status, priority in zip(tasks_names, tasks_deadlines, tasks_statuses, tasks_priorities):
        task = Task(
            creator=user,
            task_project=project,
            name=name,
            description=name,
            deadline=datetime.date.today() + datetime.timedelta(days=deadline),
            status=status,
            priority=priority,
        )
        tasks.append(task)
    Task.objects.bulk_create(tasks)
    return project
