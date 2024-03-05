from django.db import migrations

def forwards(apps, schema_editor):
    Role = apps.get_model('user', 'Role')

    admin, _ = Role.objects.get_or_create(slug='ADMIN', defaults={'name': 'Administrator'})
    coach, _ = Role.objects.get_or_create(slug='COACH', defaults={'name': 'Trener'})
    player, _ = Role.objects.get_or_create(slug='PLAYER', defaults={'name': 'Zawodnik'})

class Migration(migrations.Migration):
    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(forwards),
    ]
