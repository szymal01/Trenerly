# Generated by Django 4.2.7 on 2024-03-05 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_role_types'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='team',
            field=models.ManyToManyField(to='user.team'),
        ),
    ]