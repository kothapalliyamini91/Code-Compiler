# Generated by Django 3.2.20 on 2023-08-23 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('online', '0006_auto_20230810_1236'),
    ]

    operations = [
        migrations.AddField(
            model_name='online',
            name='question_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
