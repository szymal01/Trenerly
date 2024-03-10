from django.test import TestCase
from django.contrib.auth import get_user_model
from user.models import Role, Team

User = get_user_model()

class UserModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.role = Role.objects.create(name='Example Role', slug='example-role')
        cls.team = Team.objects.create(name='Example Team', slug='example-team')

    def setUp(self):
        self.user = User.objects.create_user(
            username='maciekiwan',
            email='maciek@iwan.com',
            password='maciek',
            first_name='Maciek',
            last_name='Iwan',
            role=self.role,
            phone_number='123456789',
            birth_details='2000-01-01'
        )
        self.user.team.add(self.team)

    def test_user_creation(self):
        self.assertEqual(self.user.username, 'maciekiwan')
        self.assertEqual(self.user.email, 'maciek@iwan.com')
        self.assertEqual(self.user.first_name, 'Maciek')
        self.assertEqual(self.user.last_name, 'Iwan')
        self.assertEqual(self.user.role, self.role)
        self.assertEqual(self.user.phone_number, '123456789')
        self.assertEqual(self.user.birth_details, '2000-01-01')
        self.assertTrue(self.user.check_password('maciek'))
        self.assertTrue(self.user.team.exists())

    def test_str_representation(self):
        self.assertEqual(str(self.user), 'Maciek Iwan')

