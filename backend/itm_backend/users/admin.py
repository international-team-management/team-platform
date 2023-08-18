from django.contrib import admin
from users.models import TimeZone, User


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "role",
        "created_at",
        "update_at",
        "is_active",
        "timezone",
        "work_start",
        "work_finish",
        "photo",
        "telephone_number",
    )


class TimeZoneAdmin(admin.ModelAdmin):
    list_display = ("value", "label", "offset", "abbrev", "altName")


admin.site.register(User, UserAdmin)
admin.site.register(TimeZone, TimeZoneAdmin)
