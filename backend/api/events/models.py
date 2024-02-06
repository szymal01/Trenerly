from django.db import models
from user.models import Team

class Location(models.Model):
    name = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    street = models.CharField(max_length=30)
    number = models.CharField(max_length=10)
    
    def __str__(self):
        return self.name

class Event(models.Model):
    type = models.CharField(max_length=50)
    title = models.CharField(max_length=250)
    start_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    start_time = models.TimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    end_date = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    end_time = models.TimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title
    
class Opponent(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Training(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    exercises = models.TextField()
    
    
class Match(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    
    
