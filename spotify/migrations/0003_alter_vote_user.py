# Generated by Django 4.1.3 on 2023-01-16 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0002_vote'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='user',
            field=models.CharField(max_length=50),
        ),
    ]
