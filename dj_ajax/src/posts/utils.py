from .models import Post
from profiles.models import Profile
from django.http import HttpResponse
from django.shortcuts import redirect


#this is a decorator to prevent users from deleting a post via http request or manually changing the URL
#if the user is the owner of the post, this http request is successful
def action_permission(func):
    def wrapper(request, **kwargs):
        pk = kwargs.get('pk')
        profile = Profile.objects.get(user=request.user)
        post = Post.objects.get(pk=pk)
        if profile.user == post.author.user:
            print('yes')
            return func(request, **kwargs)
        else:
            print('no')
            # return HttpResponse('access denied - need to be the author of the post in order to delete it')
            return redirect('posts:main-board')

    return wrapper