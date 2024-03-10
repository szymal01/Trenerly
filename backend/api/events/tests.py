from django.test import TestCase
from events.models import Location, EventType, Event
from user.models import User, Team
from django.utils import timezone

class EventModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        location = Location.objects.create(name='Test Location', city='Test City', street='Test Street', number='123')
        event_type = EventType.objects.create(name='Test Event Type', slug='test-event-type')
        team = Team.objects.create(name='Test Team', slug='test-team')
        user = User.objects.create(username='test_user', email='test@example.com')
        
        Event.objects.create(
            type=event_type,
            title='Test Event',
            start_date=timezone.now().date(),
            start_time=timezone.now().time(),
            end_date=timezone.now().date(),
            end_time=timezone.now().time(),
            location=location,
            team=team,
            exercises='Test Exercises'
        )

    def test_title_content(self):
        event = Event.objects.get(id=1)
        expected_object_name = f'{event.title}'
        self.assertEqual(expected_object_name, 'Test Event')

    def test_location_content(self):
        event = Event.objects.get(id=1)
        expected_object_name = f'{event.location}'
        self.assertEqual(expected_object_name, 'Test Location')
        
        
        