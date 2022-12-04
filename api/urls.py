from django.urls import path
from .views import RoomCreateView, RoomListView

urlpatterns = [
    path('room/create', RoomCreateView.as_view()),
    path('room/fetch', RoomListView.as_view())
]
