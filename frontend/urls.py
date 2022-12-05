from django.urls import path
from . import views
urlpatterns = [
    path("", view=views.index),
    path("join/", view=views.index),
    path("create/", view=views.index),
]
