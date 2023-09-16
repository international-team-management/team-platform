from random import randrange

from django.core.management.base import BaseCommand
from projects.factory import ProjectFactory, TaskFactory, UserFactory


class Command(BaseCommand):
    help = "Seeds the database."

    def add_arguments(self, parser):
        parser.add_argument("--projects", default=10, type=int, help="The number of fake projects to create.")

    def handle(self, *args, **options):
        for _ in range(options['projects']):
            ProjectFactory.create(participants=(UserFactory.create() for _ in range(randrange(20))))
        for _ in range(options['projects'] * 10):
            TaskFactory.create(assigned_to=(UserFactory.create() for _ in range(randrange(4))))
