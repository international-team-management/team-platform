from django.contrib import admin
from django.utils.safestring import mark_safe
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
        "telephone_number",
        "photo",
    )

    readonly_fields = ("preview",)

    def preview(self, obj):
        return mark_safe(f'<img src=" { obj.photo.url } ">')


class TimeZoneAdmin(admin.ModelAdmin):
    list_display = ("value", "label", "offset", "abbrev", "altName")


admin.site.register(User, UserAdmin)
admin.site.register(TimeZone, TimeZoneAdmin)
