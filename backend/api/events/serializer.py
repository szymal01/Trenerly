from .models import Event, Location, EventType, PlayerMatchStatistics
from rest_framework import serializers
from user.serializer import TeamSerializer

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id','name','city','street','number']

# class LocationField(serializers.Field):
#     def to_representation(self, value):
#         return value.location.name
    
# class TeamField(serializers.Field):
#     def to_representation(self, value):
#         return value.team.name
    
# class EventTypeField(serializers.Field):
#     def to_representation(self, value):
#         return value.type.name


    
class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ['id','name']


class PlayerMatchStatisticsSerializer(serializers.ModelSerializer):
    player_id = serializers.CharField()

    class Meta:
        model = PlayerMatchStatistics
        fields = (
            'id',
            'player_id',
            'title',
            'points',
            'service_sum',
            'ace',
            'service_errors',
            'receive_sum',
            'receive_errors',
            'receive_negative',
            'receive_positive',
            'receive_perfect',
            'perfect_procent',
            'spikes',
            'spike_errors',
            'spikes_blocked',
            'spike_points',
            'spike_procent',
            'blocks',
        )

        

class EventSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    type = EventTypeSerializer()
    team = TeamSerializer()

    class Meta:
        model = Event
        fields = ['type','title','start_date','start_time','end_date','end_time','location','team', 'exercises']
class EventCreateSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField()
    type_name = serializers.CharField()
    team_name = serializers.CharField()

    class Meta:
        model = Event
        fields = ['type_name','title','start_date','start_time','end_date','end_time','location_name','team_name','exercises']