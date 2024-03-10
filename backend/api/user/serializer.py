from .models import User, Role, Team
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ['id','role','username','first_name','last_name','email','password','phone_number','medical_tests_deadline','birth_details']

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name']
        

class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['surname','username']
                  
class TeamSerializer(serializers.ModelSerializer):
    #coach = CoachSerializer()
    class Meta:
        model = Team
        fields = ['id','name']#,'coach']
        
class TeamFullSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    class Meta:
        model = Team
        fields = ['id', 'name', 'users']
        
    def get_users(self, obj):
        users = User.objects.filter(team=obj.id)
        return UserSerializer(users, many=True).data
        