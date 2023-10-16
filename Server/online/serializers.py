from rest_framework import serializers
from .models import *

class OnlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Online
        fields = '__all__'