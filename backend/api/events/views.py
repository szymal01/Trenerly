from django.shortcuts import render

from user.models import Team
from .models import Event, Location
from rest_framework import permissions, viewsets
from .serializer import LocationSerializer, EventSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated


class LocationViewSet(viewsets.ModelViewSet):

    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class EventViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Event.objects.filter(team__in= self.request.user.team.all())
    def list(self,request):
        queryset = self.get_queryset().filter(Q(start_date__gte=request.query_params['start_date'])&Q(end_date__lte=self.request.query_params['end_date']))
         #queryset = Event.objects.filter(Q(start_date__gte=self.request.query_params.start_date)&Q(end_date__lte=self.request.query_params.end_date))
        serializer = EventSerializer(queryset, many=True)
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

