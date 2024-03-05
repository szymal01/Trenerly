from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from user.tokens import MyTokenObtainPairView, MyTokenRefreshView
from events.views import LocationViewSet, EventViewSet
from user.views import RegisterViewSet, TeamViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'location', LocationViewSet)
router.register(r'event', EventViewSet,basename='events')
router.register(r'users', UserViewSet, basename='users')
router.register(r'register',RegisterViewSet, basename='register')
router.register(r'teams',TeamViewSet, basename='teams')



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refresh-token/', MyTokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls