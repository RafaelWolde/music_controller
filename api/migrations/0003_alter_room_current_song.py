# Generated by Django 4.1.3 on 2023-01-16 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_room_current_song'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='current_song',
            field=models.CharField(default='', max_length=50),
        ),
    ]
