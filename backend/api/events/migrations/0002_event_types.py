from django.db import migrations

def forwards(apps, schema_editor):
    EventType = apps.get_model('events', 'EventType')

    training, _ = EventType.objects.get_or_create(slug='TRAINING', defaults={'name': 'Trening'})
    match, _ = EventType.objects.get_or_create(slug='MATCH', defaults={'name': 'Mecz'})


class Migration(migrations.Migration):
    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(forwards),
    ]
