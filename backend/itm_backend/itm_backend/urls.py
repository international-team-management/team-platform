from api.views import UserMeView, UserViewSet
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import SimpleRouter

router = SimpleRouter()

router.register("users", UserViewSet)

urlpatterns = [
    path("api/v1/", include("api.urls")),
    path("admin/", admin.site.urls),
    path("api/v1/auth/users/me", UserMeView.as_view()),
    path("api/v1/auth/", include(router.urls)),
    path("api/v1/auth/", include("djoser.urls.jwt")),
]
