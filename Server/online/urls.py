from django.urls import path
from . import views
urlpatterns = [
path('ide/', views.Useradd.as_view())

]