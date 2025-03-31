from django.urls import path
from .views import (
    post_list_and_create,
    load_post_data_view,

    hello_world_view
)

app_name = 'posts'
#create a new URL pattern for the posts page
#The empty quotes means it starts at the main page

#if we add '/posts' to the url pattern path we would have to navigate to http://127.0.0.1:8000/posts to get to this page
urlpatterns = [
    path('', post_list_and_create, name='main_board'),
    path('data/<int:num_posts>/', load_post_data_view, name='posts-data'),

    path('hello-world/', hello_world_view, name='hello-world'),
]