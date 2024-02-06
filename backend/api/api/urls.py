from django.urls import include, path
from django.contrib import admin
from rest_framework import routers

from events.views import LocationViewSet, EventViewSet, MatchViewSet, TrainingViewSet, OpponentViewSet
from user import views

router = routers.DefaultRouter()
router.register(r'location', LocationViewSet)
router.register(r'event', EventViewSet,basename='events')
router.register(r'match', MatchViewSet)
router.register(r'training', TrainingViewSet)
router.register(r'opponent', OpponentViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += router.urls