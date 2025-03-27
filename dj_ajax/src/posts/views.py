from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
# from django.core import serializers

# Create your views here.

#render all of the posts using the template provided to the render method
def post_list_and_create(request):
    #load all the post objects
    qs = Post.objects.all()
    return render(request, 'posts/main.html', {'qs':qs})

#The query set is not a JSON serializable format, so we need to format it
def load_post_data_view(request):
    qs = Post.objects.all()
    data = []
    #create a post object for each query in the query set
    for obj in qs:
        item = {
            'id' : obj.id,
            'title' : obj.title,
            'body' : obj.body,
            'author' : obj.author.user.username
        }
        data.append(item)
    # #We use the django serializers serialize method to serialize the query set
    # data = serializers.serialize('json', qs)
    return JsonResponse({'data':data})

#When this function is called it returns a JSON response with a text attribute set to hello world
def hello_world_view(request):
    return JsonResponse({'text': 'hello world x2'})