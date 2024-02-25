from .models import User, Role, Team
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name','surname','username','role','email','phone_number','team','medical_tests','birth_details']

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name']
        

class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['surname','username']
                  
class TeamSerializer(serializers.ModelSerializer):
    coach = CoachSerializer()
    class Meta:
        model = Team
        fields = ['name','coach']