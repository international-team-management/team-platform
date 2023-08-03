from django.conf import settings
from django.db import models

from projects.models import Tag
from django.utils.translation import gettext_lazy as _



class Task(models.Model):
    """
    Описание модели Task.
    """
    class StatusChoice(models.TextChoices):
        onbording = "Onbording", _("Онбординг")
        in_progress = "In progress", _("В работе")
        production = "Production", _("Проект взлетел")
        tests = "Tests", _("Тестирование")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="Создатель", null=True, on_delete=models.SET_NULL, related_name="created_tasks")
    assigned_to = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name="Участники задачи", blank=True)
    tags = models.ManyToManyField(Tag, related_name="related_tasks", verbose_name="Тэги")
    status = models.CharField(
        verbose_name="Статус проекта", choices=StatusChoice.choices, default=StatusChoice.onbording, max_length=20
    )
    description = models.TextField(verbose_name="Описание задачи")
    created_at = models.DateTimeField(verbose_name="Дата создания задачи", auto_now_add=True)
    update_at = models.DateTimeField(verbose_name="Дата обновления обносления задачи", auto_now=True)
    deadline = models.DateTimeField(verbose_name="Срок исполнения задачи")
    name = models.CharField(verbose_name="Название задачи", max_length=150, blank=True)

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.id and self.assigned_to.exists():
            for user in self.assigned_to.all():
                TaskUser.objects.get_or_create(user_id=user, task_id=self)

class TaskUser(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="Исполнитель", on_delete=models.CASCADE, related_name="related_tasks", null=True)
    task_id = models.ForeignKey(Task, verbose_name="Задача", on_delete=models.CASCADE, related_name="users", blank=True, null=True)
    
    class Meta:
        ordering = ["id"]
        verbose_name = "Задача пользователя"
        verbose_name_plural = "Задача пользователя"
    def __str__(self):
        return f"{self.user_id} - {self.task_id}"
    
    