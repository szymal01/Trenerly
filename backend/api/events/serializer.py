from .models import Event, Location
from rest_framework import serializers

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ['id','name','city','street','number']

class LocationField(serializers.Field):
    def to_representation(self, value):
        return value.location.name

class EventSerializer(serializers.HyperlinkedModelSerializer):
    location_name = LocationField(source='*')
    class Meta:
        model = Event
        fields = ['type','title','start_date','start_time','end_date','end_time','location_name']
