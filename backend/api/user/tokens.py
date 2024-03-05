from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.settings import api_settings
import logging 
from datetime import datetime, timedelta
from django.db.models import QuerySet
from django.contrib.auth.models import Permission, Group


from .models import User


logger = logging.getLogger(__name__)
  

class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': 'Nieprawidłowy login lub hasło.'
    }


    def validate(self, attrs):

        print(attrs)
        data = super().validate(attrs) 

        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)


        return data
    

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)


        role = user.role.slug
        
       

        token['user'] = UserTokenSerializer(instance=user).data
        print(user.uuid)
        token['user_uuid'] = str(user.uuid)
        token['permissions'] = [role]
        # ...
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes=[AllowAny]

    serializer_class = MyTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        token = {}
        # Check if given credentials are correct
        serializer.is_valid(raise_exception=True)
                    
        # In case of successfull authentication, reset counter and return token
        token = {}
        access_token = serializer.validated_data["access"]
        refresh_token = serializer.validated_data["refresh"]
        token["token"] = {"access_token": access_token, "refresh_token": refresh_token}
             
        return Response(token, status=200)

class MyTokenRefreshSerializer(TokenRefreshSerializer):
    token = serializers.JSONField()
    refresh = None
    def validate(self, attrs):
        try:
            refresh = RefreshToken(attrs.get('token').get("refresh_token"))
        except:
            raise InvalidToken()
        
        data = {'access': str(refresh.access_token)}
        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

        refresh.set_jti()
        refresh.set_exp()

        data['refresh'] = str(refresh)

        return data

class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer
    permission_classes=[AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            token = {}
            access_token = serializer.validated_data["access"]
            refresh_token = serializer.validated_data["refresh"]
            token["token"] = {"access_token": access_token, "refresh_token": refresh_token}
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(token, status=status.HTTP_200_OK)