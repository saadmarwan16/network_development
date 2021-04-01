from django.urls import path
from .views import PostsView, LikeView, BookmarkView

urlpatterns = [
    path("posts", PostsView.as_view()),
    path("like", LikeView.as_view()),
    path("bookmark", BookmarkView.as_view())
]