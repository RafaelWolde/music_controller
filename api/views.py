from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class RoomCreateView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomListView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    print("Get Them The Guns \n")

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print(type(serializer.data))
            guest_can_pause = serializer.data['guest_can_pause']
            votes_to_skip = serializer.data['votes_to_skip']
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
        return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)


def main(request):
    if request.POST:
        print("This is a post request")
        user_name = request.POST['user_name']
        return HttpResponse(f"{user_name}")
    else:
        print("This is a get request")
    return HttpResponse("""
    
    <form method="POST" action="/api/room/" >
    <input name="csrfmiddlewaretoken" type="hidden" value="wkV42kvOKupCxhHbC0l7iLq0l4G431FoYCiBxJMPuCwzRh7mFmS2h1NPk5w08p0a">
    <input
    <input type="text" name="user_name" />
    <input type="submit" value= "Alchemy" />
    </form>
    """)
