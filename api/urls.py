from django.urls import path
from .views import RoomCreateView, RoomListView, CreateRoomView, main

urlpatterns = [
    path('room/create', RoomCreateView.as_view()),
    path('room/fetch', RoomListView.as_view()),
    path('room/create_room', CreateRoomView.as_view()),
    path('room/', main)
]
