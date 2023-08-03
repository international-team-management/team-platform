from django.contrib import admin
from .models import Task, TaskUser

admin.site.register(Task)
admin.site.register(TaskUser)
