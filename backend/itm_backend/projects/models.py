from django.db import models

class Tag(models.Model):
    """
    Описание модели Tag.
    """

    name = models.CharField(max_length=200, unique=True, null=True, verbose_name="Название")

    class Meta:
        verbose_name = "Тэг"
        verbose_name_plural = "Тэги"

    def __str__(self):
        return f"{self.name}"
