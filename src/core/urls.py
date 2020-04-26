"""
URL routes for the core app
"""

from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    ########################
    ################# Main
    # Public pages
    path('', views.lang_pick, name='lang_pick'),
    path('about', views.about, name='about'),
    path('portfolio', views.portfolio, name='portfolio'),
    path('skills', views.skills, name='skills'),
    path('contact', views.contact, name='contact'),

    path('portfolio/more/<int:page>', views.portfolio_endpoint, name='portfolio_endpoint'),

]

if settings.DEBUG is True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
