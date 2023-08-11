from projects.models import Task
from projects.serializers import TaskAddSerializer, TaskReadSerializer
from rest_framework import permissions, viewsets


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = TaskReadSerializer

    def get_serializer_class(self):
        if self.request.method in permissions.SAFE_METHODS:
            return TaskReadSerializer
        return TaskAddSerializer
