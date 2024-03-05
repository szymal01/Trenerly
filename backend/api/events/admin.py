from django.contrib import admin
from .models import Event, Location, PlayerMatchStatistics
# Register your models here.

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']


@admin.register(PlayerMatchStatistics)
class PlayerStatsAdmin(admin.ModelAdmin):
    list_display = ['id', 'player']