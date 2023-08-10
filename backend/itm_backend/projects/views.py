from django.shortcuts import render
from rest_framework import permissions, viewsets

from projects.models import Task
from projects.serializers import TaskReadSerializer, TaskAddSerializer

class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = TaskReadSerializer

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return TaskReadSerializer
        return TaskAddSerializer

    '''def perform_create(self, serializer):
        serializer.save(creator=self.request.user)'''
