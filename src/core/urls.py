"""
URL routes for the core app
"""

from django.urls import path
from . import views

urlpatterns = [

    ########################
    ################# Main
    # Public pages
    path('', views.lang_pick, name='lang_pick'),
    path('about', views.about, name='about'),
    path('portfolio', views.portfolio, name='portfolio'),
    path('skills', views.skills, name='skills'),

    # Endpoints
    path('endpoints/about', views.about, name='endpoint_about'),
    path('endpoints/portfolio', views.portfolio, name='endpoint_portfolio'),
    path('endpoints/skills', views.skills, name='endpoint_skills'),

]
