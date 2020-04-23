"""
URL routes for the core app
"""

from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
]
