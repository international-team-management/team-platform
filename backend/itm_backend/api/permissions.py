from django.shortcuts import get_object_or_404
from projects.models import Project
from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Разрешает только владельцу проекта редактировать или удалять свой проект.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class IsParticipantOrReadOnly(permissions.BasePermission):
    """
    Разрешает только участникам проекта создавать, редактировать или удалять задачи.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        project_id = view.kwargs.get("projects_id")
        project = get_object_or_404(Project, pk=project_id)
        return request.user in project.participants.all()

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user in obj.task_project.participants.all()


class IsProjectParticipant(permissions.BasePermission):
    """
    Разрешает только участникам проекта добавлять пользователей в команду проекта.
    """

    def has_permission(self, request, view):
        project_id = view.kwargs.get("pk")
        project = get_object_or_404(Project, pk=project_id)
        return request.user in project.participants.all()
