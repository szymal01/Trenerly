# Generated by Django 4.2.7 on 2024-03-09 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_user_team'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=9, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='team',
            field=models.ManyToManyField(blank=True, null=True, to='user.team'),
        ),
    ]
