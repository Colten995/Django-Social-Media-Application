from django.shortcuts import render
from .models import Post, Photo
from django.http import JsonResponse, HttpResponse
from .forms import PostForm
from profiles.models import Profile
# from django.core import serializers

# Create your views here.

#any function that checks if the request is ajax means we are dealing with an ajax call

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

#render all of the posts using the template provided to the render method
def post_list_and_create(request):
    form = PostForm(request.POST or None)
    #load all the post objects
    # qs = Post.objects.all()

    if is_ajax(request):
        if form.is_valid():
            #get the author
            author = Profile.objects.get(user=request.user)
            #don't commit or submit the form just yet
            instance = form.save(commit=False)
            instance.author = author
            instance.save()
            return JsonResponse({
                'title': instance.title,
                'body': instance.body,
                'author': instance.author.user.username,
                'id': instance.id,
            })

    context = {
        # 'qs' : qs,
        'form' : form,
    }
    return render(request, 'posts/main.html', context)

def post_detail(request, pk):
    obj = Post.objects.get(pk=pk)
    form = PostForm()

    context = {
        'obj': obj,
        'form': form,
    }

    return render(request, 'posts/detail.html', context)

#The query set is not a JSON serializable format, so we need to format it
def load_post_data_view(request, num_posts):
    if is_ajax(request):
        #Get the number of posts to display from the url
        visible = 3
        #The post id at the upper bound
        upper = num_posts
        #The post id at the lower bound
        lower = upper - visible
        size = Post.objects.all().count()

        qs = Post.objects.all()
        data = []
        #create a post object for each query in the query set
        for obj in qs:
            item = {
                'id' : obj.id,
                'title' : obj.title,
                'body' : obj.body,
                'liked': True if request.user in obj.liked.all() else False,
                'count': obj.like_count,
                'author' : obj.author.user.username
            }
            data.append(item)
        # #We use the django serializers serialize method to serialize the query set
        # data = serializers.serialize('json', qs)
        return JsonResponse({'data':data[lower:upper], 'size':size})

def post_detail_data_view(request, pk):
    #This is shorthand to get the post that has a primary key equal to the primary key
    obj = Post.objects.get(pk=pk)
    data = {
        'id' : obj.id,
        'title' : obj.title,
        'body' : obj.body,
        'author' : obj.author.user.username,
        'logged_in' : request.user.username,
    }

    return JsonResponse({'data' : data})

def like_unlike_post(request):
    #.is_ajax attribute is deprecated, so we have to use our own function
    if is_ajax(request):
        #Get the primary key from the like/unlike ajax request in main.js
        pk = request.POST.get('pk')
        obj = Post.objects.get(pk=pk)
        if request.user in obj.liked.all():
            liked = False
            obj.liked.remove(request.user)
        else:
            liked = True
            obj.liked.add(request.user)
        return JsonResponse({'liked': liked, 'count': obj.like_count})

# #When this function is called it returns a JSON response with a text attribute set to hello world
# def hello_world_view(request):
#     return JsonResponse({'text': 'hello world x2'})

def update_post(request, pk):
    obj = Post.objects.get(pk=pk)
    if is_ajax(request):
        new_title = request.POST.get('title')
        new_body = request.POST.get('body')
        obj.title = new_title
        obj.body = new_body
        obj.save()
        return JsonResponse({
            'title' : new_title,
            'body' : new_body,
        })

def delete_post(request, pk):
    obj = Post.objects.get(pk=pk)
    if is_ajax(request):
        obj.delete()
        return JsonResponse({})
    
def image_upload_view(request):
    # print (request.FILES)
    if request.method == 'POST':
        img = request.FILES.get('file')
        new_post_id = request.POST.get('new_post_id')
        post = Post.objects.get(id=new_post_id)
        Photo.objects.create(image=img, post=post)
    return HttpResponse()
