from django.shortcuts import render
from .models import Post
from django.http import JsonResponse

# Create your views here.

#render all of the posts using the template provided to the render method
def post_list_and_create(request):
    qs = Post.objects.all()
    return render(request, 'posts/main.html', {'qs':qs})

#When this function is called it returns a JSON response with a text attribute set to hello world
def hello_world_view(request):
    return JsonResponse({'text': 'hello world x2'})