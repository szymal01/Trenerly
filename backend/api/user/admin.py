from django.contrib import admin
from .models import User, Role, Team
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email']

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']