import pytest
from projects.models import Project, Task


@pytest.fixture
def project(user):
    project = Project.objects.create(
        name="Тестовый проект",
        description="описание тестового проекта",
        owner=user,
        start="2023-08-20",
        deadline="2023-08-20",
        status="Onboarding",
        priority="maximum",
    )
    project.participants.set([user])
    return project


@pytest.fixture
def another_project(user):
    project = Project.objects.create(
        name="Тестовый проект номер 2",
        description="описание тестового проекта номер 2",
        owner=user,
        start="2023-08-20",
        deadline="2023-08-20",
        status="Onboarding",
        priority="maximum",
    )
    project.participants.set([user])
    return project


@pytest.fixture
def task(project, user):
    task = Task.objects.create(
        priority=Task.PriorityChoice.minimum,
        task_project=project,
        creator=user,
        status=Task.StatusChoice.backlog,
        description="Описание задачи",
        deadline="2023-09-08",
        name="Название задачи",
    )
    task.assigned_to.set([user])
    return task


@pytest.fixture
def task2(project, user2):
    task = Task.objects.create(
        priority=Task.PriorityChoice.minimum,
        task_project=project,
        creator=user2,
        status=Task.StatusChoice.backlog,
        description="Описание задачи номер 2",
        deadline="2023-09-08",
        name="Название задачи номер 2",
    )
    task.assigned_to.set([user2])
    return task
