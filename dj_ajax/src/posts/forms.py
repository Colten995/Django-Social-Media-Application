from django import forms
from .models import Post

#The meta method modifies the way classes are generated
class PostForm(forms.ModelForm):
    # title = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    # body = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3}))
    #create a new class called meta inside the post form class and give it two members
    class Meta:
        model = Post
        fields = ('title', 'body',)