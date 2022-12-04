from django.db import models
import string
import random


def generate_unique_code():
    length = 6
    while True:
        _code = ''.join(random.choices(string.ascii_uppercase))
        if Room.objects.filter(code=_code).count() == 0:
            break

    return


class Room(models.Model):
    code = models.CharField(
        max_length=8, default="", unique=True, )
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self):
        self.code = generate_unique_code()
        super()