from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class Tag(models.Model):
    """
    Описание модели Tag.
    """

    name = models.CharField(max_length=200, unique=True, verbose_name="Название")

    class Meta:
        verbose_name = "Тэг"
        verbose_name_plural = "Тэги"

    def __str__(self):
        return f"{self.name}"


class Task(models.Model):
    """
    Описание модели Task.
    """

    class StatusChoice(models.TextChoices):
        backlog = "Backlog", _("Бэклог")
        todo = "Todo", _("Необходимо сделать")
        in_progress = "In progress", _("В работе")
        in_review = "In review", _("На рассмотрении")
        done = "Done", _("Завершено")
    project = models.ForeignKey(
        "Project", 
        verbose_name="Проект",
        on_delete=models.CASCADE,
        related_name="task"
    )
    creator = models.ForeignKey(
        User,
        verbose_name="Создатель",
        null=True,
        on_delete=models.PROTECT,
        related_name="created_tasks",
    )
    assigned_to = models.ManyToManyField(User, verbose_name="Участники задачи", blank=True)
    tags = models.ManyToManyField(Tag, related_name="related_tasks", verbose_name="Тэги", blank=True)
    status = models.CharField(
        verbose_name="Статус задачи",
        choices=StatusChoice.choices,
        default=StatusChoice.backlog,
        max_length=20,
    )
    description = models.TextField(verbose_name="Описание задачи")
    created_at = models.DateTimeField(verbose_name="Дата создания задачи", auto_now_add=True)
    update_at = models.DateTimeField(verbose_name="Дата обновления задачи", auto_now=True)
    deadline = models.DateField(verbose_name="Срок исполнения задачи")
    name = models.CharField(verbose_name="Название задачи", max_length=150, blank=True)

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.id and self.assigned_to.exists():
            for user in self.assigned_to.all():
                TaskUser.objects.get_or_create(user_id=user, task_id=self)


class TaskUser(models.Model):
    user_id = models.ForeignKey(
        User,
        verbose_name="Исполнитель",
        on_delete=models.CASCADE,
        related_name="related_tasks",
        null=True,
    )
    task_id = models.ForeignKey(
        Task,
        verbose_name="Задача",
        on_delete=models.CASCADE,
        related_name="users",
        blank=True,
        null=True,
    )

    class Meta:
        ordering = ["id"]
        verbose_name = "Задача пользователя"
        verbose_name_plural = "Задача пользователя"

    def __str__(self):
        return f"{self.user_id} - {self.task_id}"


class Project(models.Model):
    """
    Описание модели Project.
    """

    class StatusChoice(models.TextChoices):
        onbording = "Onboarding", _("Онбординг")
        in_progress = "In progress", _("В работе")
        production = "Production", _("Проект взлетел")
        tests = "Tests", _("Тестирование")

    class PriorityChoice(models.TextChoices):
        maximum = "maximum", _("Максимальный")
        average = "average", _("Средний")
        minimum = "minimum", _("Минимальный")
        urgent = "urgent", _("Срочно")

    name = models.CharField(max_length=254, verbose_name="Название Проекта")
    description = models.TextField(verbose_name="Описание Проекта")
    owner = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="projects",
        verbose_name="Автор Проекта",
    )
    participants = models.ManyToManyField(User, through="ProjectUser", verbose_name="Участники проекта", blank=True)
    tasks = models.ManyToManyField(Task, related_name="projects", verbose_name="Задачи проекта", blank=True)
    deadline = models.DateField(verbose_name="Дата окончания проекта")
    status = models.CharField(
        verbose_name="Статус проекта",
        choices=StatusChoice.choices,
        default=StatusChoice.onbording,
        max_length=20,
    )
    priority = models.CharField(verbose_name="Приоритет проекта", choices=PriorityChoice.choices, max_length=20)
    tags = models.ManyToManyField(Tag, related_name="projects", verbose_name="Тэги", blank=True)
    created_at = models.DateTimeField(verbose_name="Дата регистрации проекта", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="Дата обновления проекта", auto_now=True)

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"

    def __str__(self):
        return f"{self.name}, {self.description[::35]}"


class ProjectUser(models.Model):
    user_id = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="project_participants",
        verbose_name="Участник",
    )
    project_id = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="project_participants",
        verbose_name="Проект",
    )

    class Meta:
        constraints = (
            models.UniqueConstraint(
                fields=(
                    "user_id",
                    "project_id",
                ),
                name="unique_user_project",
            ),
        )
        verbose_name = "Участник Проекта"
        verbose_name_plural = "Участники Проекта"
