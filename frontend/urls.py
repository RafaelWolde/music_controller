from django.urls import path
from . import views

app_name = 'frontend'

urlpatterns = [
    path("", view=views.index, name=''),
    path("join/", view=views.index),
    path("create/", view=views.index),
    path('room/<str:roomCode>/', view=views.index)
]
