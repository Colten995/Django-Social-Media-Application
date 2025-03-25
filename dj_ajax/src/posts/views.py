from django.shortcuts import render
from .models import Post

# Create your views here.

#render all of the posts using the template provided to the render method
def post_list_and_create(request):
    qs = Post.objects.all()
    return render(request, 'posts/main.html', {'qs':qs})