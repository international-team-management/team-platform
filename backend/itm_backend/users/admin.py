from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = (
        'email', 'first_name', 'last_name', 'role', 'created_at', 'update_at', 'is_active', 'user_timezone', 'timetable', 'photo', 'telephone_number'
    )

admin.site.register(User)