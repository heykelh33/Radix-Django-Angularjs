#url.py for sensors App

from django.conf.urls import url
from . import views

# sensors views
urlpatterns = [
	url(r'^$', views.sensor, name='sensor'),
]