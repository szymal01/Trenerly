# Generated by Django 4.2.7 on 2024-01-23 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_rename_teams_team'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='coach_id',
        ),
        migrations.RemoveField(
            model_name='user',
            name='medical_tests',
        ),
        migrations.AddField(
            model_name='user',
            name='medical_tests_deadline',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=9),
        ),
    ]