from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from rest_framework.decorators import action
from .models import Team, User
from .serializer import UserSerializer,TeamSerializer,TeamFullSerializer

class UserViewSet(viewsets.ViewSet):
    lookup_field = 'uuid'
    def get_queryset(self):
        return User.objects.all()
        
    def retrieve(self,request,uuid=None):
        
        user=get_object_or_404(self.get_queryset(), uuid=uuid) 
        serializer = UserSerializer(user)
        
        return Response(serializer.data)
    
    def partial_update(self, request, uuid=None):
        instance=get_object_or_404(self.get_queryset(), uuid=uuid)
        if request.user !=instance and request.user.role.sulg != 'ADMIN' :
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if request.data.get('password'):
            instance.set_password(request.data.get('password'))
            instance.save()
        return Response(serializer.data)
    
    def list(self,request):
        serializer = UserSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    
    @action(methods=['POST'],detail=False,permission_classes=(IsAuthenticated,))
    def add_player_to_team(self,request,uuid=None):
        user=get_object_or_404(User,email=request.data.get('email'))
        team = get_object_or_404(Team, id=request.data.get('teamId'))
        user.team.add(team)
        return Response()
    
        
class TeamViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Team.objects.filter(id__in= self.request.user.team.all())
    def list(self,request):
        serializer = TeamSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        team = self.get_object()
        serializer = TeamFullSerializer(team)
        return Response(serializer.data)
         
    def create(self, request):

        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            team_data = serializer.data
            team = Team(
                name=team_data.get('name')
            )
            team.save()
            request.user.team.add(team)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterViewSet(viewsets.ViewSet):
    lookup_field = 'uuid'
    permission_classes=[AllowAny]
    
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.data
            user= User(
                username=user_data.get('username'),
                first_name=user_data.get('first_name'),
                last_name=user_data.get('last_name'),
                email=user_data.get('email'),
                phone_number=user_data.get('phone_number'),
                medical_tests_deadline=user_data.get('medical_tests_deadline'),
                birth_details=user_data.get('birth_details'),
            )
            user.set_password(request.data.get('password'))
            print(request.data.get('password'))
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    