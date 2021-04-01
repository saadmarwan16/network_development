from django.core import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from .models import Post
from backend.accounts.models import UserAccount
from backend.likes.models import Like
from backend.bookmarks.models import Bookmark


class PostsView(ListAPIView):

    def get(self, request, format=None):

        posts = Post.objects.select_related('poster').all().order_by(("-timestamp"))
        response = list()

        for post in posts:
            post_dict = dict()
            post_dict["name"] = post.poster.name
            post_dict["username"] = post.poster.username
            post_dict["timestamp"] = post.timestamp.strftime("%b %d %Y, %I:%M %p")
            post_dict["content"] = post.content
            post_dict["is_edited"] = post.is_edited
            post_dict["num_of_likes"] = post.likes.filter(is_liked=True).count()
            post_dict["is_liked"] = False if post.likes.filter(post_id=post.id, 
                                    liker_id=self.request.user.id).count() < 1 else post.likes.filter(
                                    post_id=post.id, liker_id=self.request.user.id)[0].is_liked
            post_dict["num_of_comments"] = post.comments.all().count()
            post_dict["num_of_bookmarks"] = post.bookmarks.filter(is_bookmarked=True).count()
            post_dict["is_bookmarked"] = False if post.bookmarks.filter(post_id=post.id, bookmarker_id=
                                         self.request.user.id).count() < 1 else post.bookmarks.filter(
                                         post_id=post.id, bookmarker_id=self.request.user.id)[0].is_bookmarked

            if post.poster.profile_pic:
                post_dict["profile_pic"] = post.poster.profile_pic.url
            if post.image_1:
                post_dict["image_1"] = post.image_1.url
            if post.image_2:
                post_dict["image_2"] = post.image_2.url
            if post.image_3:
                post_dict["image_3"] = post.image_3.url

            response.append(post_dict)


        return Response({"posts": response})


class LikeView(APIView):

    def put(self, request, format=None):
        data = self.request.data

        if not (data.get("post_id") and data.get("user_id") and data.get("like")):
            Response({"error": "Something happened, could not like post"})

        post = Post.objects.get(pk=data.get("post_id"))
        liker = UserAccount.objects.get(pk=data.get("user_id"))
        like = Like.objects.filter(post=post, liker=liker)

        if len(like) != 1:
            if data.get("like"):
                like = Like(is_liked=True, post=post, liker=liker)
                like.save()
                return Response({"success": "Post updated successfully"})

            return Response({"error": "Something unexpected happened"})

        like = like[0]
        like.is_liked = data.get("like")
        like.save()
        return Response({"success": "Post updated successfully"})


class BookmarkView(APIView):

    def put(self, request, format=None):
        data = self.request.data

        if not (data.get("post_id") and data.get("user_id") and data.get("bookmark")):
            Response({"error": "Something happened, could not bookmark post"})

        post = Post.objects.get(pk=data.get("post_id"))
        bookmarker = UserAccount.objects.get(pk=data.get("user_id"))
        bookmark = Bookmark.objects.filter(post=post, bookmarker=bookmarker)

        if len(bookmark) != 1:
            if data.get("bookmark"):
                bookmark = Bookmark(is_bookmarked=True, post=post, bookmarker=bookmarker)
                bookmark.save()
                return Response({"success": "Post updated successfully"})
            
            return Response({"error": "Something unexpected happend"})

        bookmark = bookmark[0]
        bookmark.is_bookmarked = data.get("bookmark")
        bookmark.save()
        return Response({"success": "Post updated successfully"})