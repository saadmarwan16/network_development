from django.urls import path
from .views import CommentView

urlpatterns = [
    path("get-comments/<int:post_id>", CommentView.as_view()),
]