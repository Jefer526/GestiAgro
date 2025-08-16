from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, MeView, LogoutView, DemoSignupAPIView, SetPasswordAPIView,
    AccountsUserToggleActiveAPIView, UsersListView, UserDetailUpdateView,
    SendTemporaryPasswordAPIView, UpdateUserRoleView, ChangePasswordAPIView,
    RolesListView, MyRolesView, MyTokenObtainPairView
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),  # 👈 login definitivo
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),

    path("demo/signup/", DemoSignupAPIView.as_view(), name="demo-signup"),
    path("password/set/", SetPasswordAPIView.as_view(), name="password-set"),
    path("password/change/", ChangePasswordAPIView.as_view(), name="password-change"),

    path("users/<int:pk>/toggle-active/", AccountsUserToggleActiveAPIView.as_view(),
         name="accounts-users-toggle-active"),
    path("users/", UsersListView.as_view(), name="users-list"),
    path("users/<int:pk>/", UserDetailUpdateView.as_view(), name="user-detail-update"),
    path("users/<int:pk>/send-temp-password/", SendTemporaryPasswordAPIView.as_view(), name="send_temp_password"),
    path("update-role/<int:pk>/", UpdateUserRoleView.as_view(), name="update-role"),

    path("roles/", RolesListView.as_view(), name="roles-list"),
    path("auth/my-roles/", MyRolesView.as_view(), name="my-roles"),
]
