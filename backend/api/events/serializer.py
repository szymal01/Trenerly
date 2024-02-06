from .models import Event, Training, Match, Opponent, Location
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
        fields = ['type','title','start_date','end_date','location_name']

class TrainingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Training
        fields = ['id','event']
        
class MatchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Match
        fields = ['id','event']
        
class OpponentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Opponent
        fields = ['id','name','match']