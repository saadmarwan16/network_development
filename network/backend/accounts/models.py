from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self, username, name, password=None):
        if not username:
            raise ValueError("Users must have a username")

        user = self.model(username=username, name=name)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, name, password):
        user = self.create_user(username, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    profile_pic = models.ImageField(default=None, upload_to="profile-picture/", blank=True, null=True)
    cover_pic = models.ImageField(default=None, upload_to="cover-picture/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.username