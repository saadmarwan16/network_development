from django.db import models

from backend.accounts.models import UserAccount


class Post(models.Model):
    timestamp = models.DateTimeField(auto_now=True)
    content = models.CharField(max_length=255)
    is_edited = models.BooleanField(default=False)
    image_1 = models.ImageField(default=None, upload_to="post-image/", blank=True, null=True)
    image_2 = models.ImageField(default=None, upload_to="post-image/", blank=True, null=True)
    image_3 = models.ImageField(default=None, upload_to="post-image/", blank=True, null=True)
    poster = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name="posts")
