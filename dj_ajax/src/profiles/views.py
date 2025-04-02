from django.shortcuts import render
from .models import Profile
from .forms import ProfileForm
from django.http import JsonResponse

# Create your views here.

def my_profile_view(request):
    obj = Profile.objects.get(user = request.user)
    form = ProfileForm(request.POST or None, request.FILES or None, instance = obj)