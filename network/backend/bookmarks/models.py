from django.db import models

from backend.accounts.models import UserAccount
from backend.posts.models import Post


class Bookmark(models.Model):
    is_bookmarked = models.BooleanField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="bookmarks")
    bookmarker = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name="bookmarks")