from django.urls import path
from .views import (
    post_list_and_create,
    load_post_data_view,
    like_unlike_post,
    post_detail,
    post_detail_data_view,
    delete_post,
    update_post,
    image_upload_view,

)

app_name = 'posts'
#create a new URL pattern for the posts page
#The empty quotes means it starts at the main page

#if we add '/posts' to the url pattern path we would have to navigate to http://127.0.0.1:8000/posts to get to this page
#We can add variables to the url in the <> tag
urlpatterns = [
    path('', post_list_and_create, name='main_board'),
    path('like-unlike/', like_unlike_post, name='like-unlike'),
    path('upload/', image_upload_view, name='image-upload'),
    path('<pk>/', post_detail, name='post-detail'),
    path('<pk>/update/', update_post, name='post-update'),
    path('<pk>/delete/', delete_post, name='post-delete'),

    path('data/<int:num_posts>/', load_post_data_view, name='posts-data'),
    path('<pk>/data/', post_detail_data_view, name='post-detail-data'),
]