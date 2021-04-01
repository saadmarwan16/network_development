from django.db import models

from backend.accounts.models import UserAccount
from backend.posts.models import Post


class Like(models.Model):
    is_liked = models.BooleanField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    liker = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name="likes")