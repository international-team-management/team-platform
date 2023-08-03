from django.contrib import admin
from .models import Tag

from .models import Project, ProjectUser, Tag


class ProjectUserInline(admin.TabularInline):
    model = ProjectUser
    extra = 1


class TagAdmin(admin.ModelAdmin):
    """Отображение модели Tag в Админке."""

    list_display = (
        "pk",
        "name",
    )
    list_editable = ("name",)
    search_fields = ("name",)
    empty_value_display = "-пусто-"


class ProjectAdmin(admin.ModelAdmin):
    """
    Отображение модели Project в Админке.
    """

    list_display = (
        "pk",
        "name",
        "description",
        "owner",
        "deadline",
        "status",
        "priority",
    )
    list_editable = (
        "name",
        "description",
        "deadline",
        "status",
        "priority",
    )
    list_filter = ("tags",)
    search_fields = ("tasks",)
    inlines = (ProjectUserInline,)
    empty_value_display = "-пусто-"

    def formfield_for_dbfield(self, db_field, **kwargs):
        """Автоподстановка текущего пользователя в создателя проекта при
        создании через Админку."""
        field = super(ProjectAdmin, self).formfield_for_dbfield(db_field, **kwargs)
        if db_field.name == "owner":
            field.initial = kwargs["request"].user.id
        return field


class ProjectUserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user_id",
        "project_id",
    )
    list_filter = ("id", "user_id", "project_id")


admin.site.register(Tag, TagAdmin)
admin.site.register(Project, ProjectAdmin)
