from django.contrib import admin
from .models import User, Role, Player_statistics, Team
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

@admin.register(Player_statistics)
class PlayerStatsAdmin(admin.ModelAdmin):
    list_display = ['id', 'player']
    
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']