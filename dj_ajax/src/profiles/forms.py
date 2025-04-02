from django import forms
from .models import Profile

#This class inherits from forms.ModelForm
class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('bio', 'avatar',)