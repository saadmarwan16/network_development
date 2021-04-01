from django.urls import path
from .views import SignUpView, MyProfileView, OtherProfileView

urlpatterns = [
    path('signup', SignUpView.as_view()),
    path('my-profile', MyProfileView.as_view()),
    path('other-profile/<int:id>', OtherProfileView.as_view())
]