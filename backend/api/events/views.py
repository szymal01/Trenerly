from django.shortcuts import render
from .models import Event, Opponent, Match, Training, Location
from rest_framework import permissions, viewsets
from .serializer import LocationSerializer, EventSerializer, OpponentSerializer, MatchSerializer, TrainingSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q

class LocationViewSet(viewsets.ModelViewSet):

    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class EventViewSet(viewsets.ModelViewSet):
    
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    # def get_queryset(self):
    #     queryset = Event.objects.filter(Q(start_date__gte=self.request.start_date)&Q(end_date__lte=self.request.end_date))
    #     return queryset
    # serializer_class = EventSerializer
    # def list(self,request):
    #     queryset = Event.objects.all()
    #      #queryset = Event.objects.filter(Q(start_date__gte=self.request.query_params.start_date)&Q(end_date__lte=self.request.query_params.end_date))
    #     serializer = EventSerializer(queryset)
    #     return Response(serializer.data)
    # def retrieve(self, request, uuid=None):
    #     queryset = Event.objects.all()
    #     #queryset = Event.objects.filter(Q(start_date__gte=self.request.query_params.start_date)&Q(end_date__lte=self.request.query_params.end_date))
    #     event = get_object_or_404(queryset, uuid=uuid) 
    #     serializer = EventSerializer(event)
    #     return Response(serializer.data)

class MatchViewSet(viewsets.ModelViewSet):

    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    
class TrainingViewSet(viewsets.ModelViewSet):

    queryset = Training.objects.all()
    serializer_class = TrainingSerializer
    
class OpponentViewSet(viewsets.ModelViewSet):

    queryset = Opponent.objects.all()
    serializer_class = OpponentSerializer