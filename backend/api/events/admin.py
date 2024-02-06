from django.contrib import admin
from .models import Event, Training, Match, Opponent, Location
# Register your models here.

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ['id']

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['id']
    
@admin.register(Opponent)
class OpponentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']