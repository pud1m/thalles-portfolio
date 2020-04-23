"""
URL routes for the core app
"""

from django.urls import path
from . import views

urlpatterns = [

    ########################
    ################# Main
    # Public pages
    path('', views.home, name='home'),
]
