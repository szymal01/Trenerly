from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=9)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    medical_tests_deadline = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
    birth_details = models.DateField(auto_now=False, auto_now_add=False)
    
    def __str__(self):
        return "{} {}".format(self.name,self.surname)
    
class Player_statistics(models.Model):
    stats = models.TextField()
    player = models.ForeignKey(User, on_delete=models.CASCADE)