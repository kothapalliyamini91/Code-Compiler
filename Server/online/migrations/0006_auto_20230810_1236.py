# Generated by Django 3.2.20 on 2023-08-10 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('online', '0005_alter_online_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='online',
            name='error',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='online',
            name='status',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='online',
            name='time',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='online',
            name='language_name',
            field=models.CharField(choices=[('50', 'c'), ('54', 'cpp'), ('62', 'java'), ('71', 'python')], max_length=10),
        ),
    ]