from django.db import models
from user.models import Team, User
from django.utils.functional import cached_property


class Location(models.Model):
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    street = models.CharField(max_length=30)
    number = models.CharField(max_length=10)
    
    def __str__(self):
        return self.name
    
class EventType(models.Model):
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
    

class Event(models.Model):
    type = models.ForeignKey(EventType, on_delete=models.PROTECT)
    title = models.CharField(max_length=250)
    start_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    start_time = models.TimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    end_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    end_time = models.TimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    location = models.ForeignKey(Location, on_delete=models.PROTECT)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    exercises = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.title
    

class PlayerMatchStatistics(models.Model):
    
    player = models.ForeignKey(User, on_delete=models.PROTECT)
    title = models.CharField(max_length=50,null=True, blank=True)
    
    points = models.IntegerField()
    
    service_sum = models.IntegerField()
    ace = models.IntegerField()
    service_errors = models.IntegerField()
    
    receive_sum = models.IntegerField()
    receive_errors = models.IntegerField()
    receive_negative = models.IntegerField()
    receive_positive = models.IntegerField()
    receive_perfect = models.IntegerField()
    @cached_property
    def perfect_procent(self):
        return self.receive_perfect*100/self.receive_sum
    
    spikes = models.IntegerField()
    spike_errors = models.IntegerField()
    spikes_blocked = models.IntegerField()
    spike_points = models.IntegerField()
    @cached_property
    def spike_procent(self):
        return self.spike_points*100/self.spikes
    
    blocks = models.IntegerField()
    
class Attendance(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    attendance = models.BooleanField()
    
class Indisposition(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    end_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    reason = models.CharField(max_length=254)