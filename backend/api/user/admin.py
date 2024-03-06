from django.contrib import admin
from .models import User, Role, Team, ChatRoom, Messages
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
    
@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ['id']
    
@admin.register(Messages)
class MessagesAdmin(admin.ModelAdmin):
    list_display = ['id', 'chat_room', 'user_from']