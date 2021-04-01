from django.db import models

from backend.accounts.models import UserAccount
from backend.posts.models import Post


class Comment(models.Model):
    is_edited = models.BooleanField(default=False)
    content = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now=True)
    commenter = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")