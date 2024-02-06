from .models import User, Role, Player_statistics, Team
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name','surname','username','role','email','phone_number','team','medical_tests','birth_details']

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name']
        
class PlayerStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player_statistics
        fields = ['user','stats']
        

class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['surname','username']
                  
class TeamSerializer(serializers.ModelSerializer):
    coach = CoachSerializer()
    class Meta:
        model = Team
        fields = ['name','coach']