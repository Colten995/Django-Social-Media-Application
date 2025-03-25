from .models import Profile
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# The sender is the user
# The user that is created is the instance
# Created is a boolean value indicating that an instance is created, created can only be true once

# This function triggers twice because there are two forms that are saved when creating a user

@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, *args, **kwargs):
    print(sender)
    print(instance)
    print(created)
    if created:
        Profile.objects.create(user=instance)