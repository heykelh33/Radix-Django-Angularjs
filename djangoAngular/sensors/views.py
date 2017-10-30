# views.py : The logic of your application goes here. Each view receives an
# HTTP request, processes it, and returns a response.


# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


def sensor(request):
	
    return render(request, 'sensor/sensor.html', {'sensor': 00})

