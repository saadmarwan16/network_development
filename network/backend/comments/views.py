from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from backend.posts.models import Post


class CommentView(ListAPIView):

    def get(self, request, post_id, format=None):
        post = Post.objects.prefetch_related("comments").get(pk=post_id)
        comments = post.comments.all().select_related('commenter').order_by("-timestamp")
        response = list()

        for comment in comments:
            comment_dict = dict()
            comment_dict["name"] = comment.commenter.name
            comment_dict["username"] = comment.commenter.username
            comment_dict["profile_pic"] = comment.commenter.profile_pic.url if \
                                          comment.commenter.profile_pic else None
            comment_dict["content"] = comment.content
            comment_dict["timestamp"] = comment.timestamp.strftime("%b %d %Y, %I:%M %p")
            comment_dict["is_edited"] = comment.is_edited

            response.append(comment_dict)

        return Response({"comments": response})