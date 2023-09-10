import factory
from django.contrib.auth import get_user_model
from projects.models import Project, Task
from users.models import TimeZone

User = get_user_model()

ROLES_CHOICES = [
    "Тестировщик",
    "Системный администратор",
    "Мобильный разработчик",
    "Frontend разработчик",
    "Backend разработчик",
    "DevOps",
    "Аналитик",
    "Менеджер проекта",
    "UI дизайнер",
]


class TimeZoneFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = TimeZone

    value = factory.Faker("word")
    label = factory.Faker("word")
    offset = factory.Faker("random_int", min=-12, max=14)
    abbrev = factory.Faker("word")
    altName = factory.Faker("word")


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("email", "password", "first_name", "last_name")

    email = factory.Faker("free_email")
    password = factory.Faker("sha1")
    first_name = factory.Faker("first_name", locale="ru_RU")
    last_name = factory.Faker("last_name", locale="ru_RU")
    role = factory.Faker("random_element", elements=ROLES_CHOICES)
    timezone = factory.SubFactory(TimeZoneFactory)
    work_start = factory.Faker("time", pattern="%H:%M")
    work_finish = factory.Faker("time", pattern="%H:%M")
    telephone_number = factory.Sequence(lambda n: "+7911182%04d" % n)


class ProjectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Project

    name = factory.Faker("sentence", locale="ru_RU")
    description = factory.Faker("text", locale="ru_RU", max_nb_chars=250)
    owner = factory.SubFactory(UserFactory)
    start = factory.Faker("date_this_month")
    deadline = factory.Faker("date_this_year", before_today=False, after_today=True)
    status = factory.Faker("random_element", elements=Project.StatusChoice)
    priority = factory.Faker("random_element", elements=Project.PriorityChoice)

    @factory.post_generation
    def participants(self, create, extracted, **kwargs):
        if not create or not extracted:
            return
        self.participants.add(*extracted)


class TaskFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Task

    task_project = factory.Faker("random_element", elements=Project.objects.all())
    creator = factory.SubFactory(UserFactory)
    status = factory.Faker("random_element", elements=Project.StatusChoice)
    priority = factory.Faker("random_element", elements=Project.PriorityChoice)
    description = factory.Faker("text", locale="ru_RU", max_nb_chars=250)
    deadline = factory.Faker("date_this_year", before_today=False, after_today=True)
    name = factory.Faker("sentence", locale="ru_RU")

    @factory.post_generation
    def assigned_to(self, create, extracted, **kwargs):
        if not create or not extracted:
            return
        self.assigned_to.add(*extracted)
