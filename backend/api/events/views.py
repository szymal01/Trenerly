from django.shortcuts import render

from user.models import Team
from .models import Event, Location
from rest_framework import permissions, viewsets
from .serializer import LocationSerializer, EventSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


class LocationViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Location.objects.all()
    def list(self,request):
        serializer = LocationSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    def create(self, request):
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            location_data = serializer.data
            location = Location(
                name=location_data.get('name'),
                city=location_data.get('city'),
                street=location_data.get('street'),
                number=location_data.get('number'),
            )
            location.save()
            #request.user.event.add(event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Event.objects.filter(team__in= self.request.user.team.all())
    def list(self,request):
        queryset = self.get_queryset().filter(Q(start_date__gte=request.query_params['start_date'])&Q(end_date__lte=self.request.query_params['end_date']))
         #queryset = Event.objects.filter(Q(start_date__gte=self.request.query_params.start_date)&Q(end_date__lte=self.request.query_params.end_date))
        serializer = EventSerializer(queryset, many=True)
        return Response(serializer.data)
    def create(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            event_data = serializer.data
            location_name=event_data.get('location'),
            location, _ = Location.objects.filter(name=location_name).first()
            event = Event(
                title=event_data.get('title'),
                start_date=event_data.get('start_date'),
                end_date=event_data.get('end_date'),
                start_time=event_data.get('start_time'),
                end_time=event_data.get('end_time'),
                location=location,
            )
            event.save()
            #request.user.event.add(event)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class EventTypeViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Location.objects.all()
    def list(self,request):
        serializer = LocationSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    # def get_queryset(self):
    #     queryset = Event.objects.filter(Q(start_date__gte=self.request.start_date)&Q(end_date__lte=self.request.end_date))
    #     return queryset
    # serializer_class = EventSerializer
    # def retrieve(self, request, uuid=None):
    #     queryset = Event.objects.all()
    #     queryset = Event.objects.filter(Q(start_date__gte=self.request.query_params.start_date)&Q(end_date__lte=self.request.query_params.end_date))
    #     event = get_object_or_404(queryset, uuid=uuid) 
    #     serializer = EventSerializer(event)
    #     return Response(serializer.data)

