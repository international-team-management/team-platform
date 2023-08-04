from django.contrib import admin

from .models import TimeTable, TimeZone, User


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
        "timezone",
        "photo",
        "telephone_number",
    )
    inlines = [TimeTableInline]


class TimeZoneAdmin(admin.ModelAdmin):
    list_display = ("value", "label", "offset", "abbrev", "altName")


admin.site.register(User, UserAdmin)
admin.site.register(TimeZone, TimeZoneAdmin)
