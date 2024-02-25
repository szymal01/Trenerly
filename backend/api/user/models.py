from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class Role(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
    
class User(AbstractUser):

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'Użytkownik'
        verbose_name_plural = 'Użytkownicy'
        ordering = ['username']

        default_permissions = ()
        permissions = ()

    uuid = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=True)
    email = models.EmailField("Adres E-mail", max_length=254, unique=True, null=False, blank=False)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=9)
    team = models.ForeignKey(Team, on_delete=models.CASCADE,null=True)
    medical_tests_deadline = models.DateField(null=True, blank=True)
    birth_details = models.DateField(null=True,blank=True)
    def __str__(self):
        return "{} {}".format(self.first_name,self.last_name)
    
