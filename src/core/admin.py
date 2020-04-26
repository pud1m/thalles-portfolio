"""Settings for the Django Admin"""
#Django main import
from django.contrib import admin
#Summernote
from django_summernote.admin import SummernoteModelAdmin
#Models
from .models import HomePage, PortfolioItem, Skillset


class SomeModelAdmin(SummernoteModelAdmin): 
    summernote_fields = '__all__'

admin.site.register(HomePage, SomeModelAdmin)
admin.site.register(Skillset, SomeModelAdmin)
admin.site.register(PortfolioItem, SomeModelAdmin)