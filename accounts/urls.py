from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MeView, LogoutView, DemoSignupAPIView, SetPasswordAPIView
from .views_auth import EmailLoginView  # 👈 usa esta

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token-by-email/", EmailLoginView.as_view(), name="token_by_email"),  # 👈 aquí
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),
    path("token/", EmailLoginView.as_view(), name="token_obtain_pair"),  # /api/token/
    path("demo/signup/", DemoSignupAPIView.as_view(), name="demo-signup"),
    path("password/set/", SetPasswordAPIView.as_view(), name="password-set"),
]
