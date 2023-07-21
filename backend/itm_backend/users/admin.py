from django.contrib import admin

from .models import TimeTable, User


class TimeTableInline(admin.TabularInline):
    model = TimeTable
    extra = 1


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "role",
        "created_at",
        "update_at",
        "is_active",
        "user_timezone",
        "photo",
        "telephone_number",
    )
    inlines = [TimeTableInline]


admin.site.register(User, UserAdmin)
