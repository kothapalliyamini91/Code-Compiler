# Generated by Django 4.2.3 on 2023-07-13 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Online',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(max_length=100)),
                ('source_code', models.TextField()),
                ('output', models.TextField()),
                ('language_name', models.CharField(choices=[('C', 'c'), ('C++', 'c++'), ('JAVA', 'java'), ('PYTHON', 'python')], max_length=10)),
            ],
        ),
    ]
