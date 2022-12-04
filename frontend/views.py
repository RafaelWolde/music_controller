from django.shortcuts import render


def index(request, *args, **kwargs):
    return render(request=request, template_name="frontend/index.html")
