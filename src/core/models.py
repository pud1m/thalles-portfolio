"""Models for the core webpage"""
from django.db import models


class HomePage(models.Model):
    """The homepage"""
    picture = models.ImageField(upload_to='home/images/', blank=True, null=True)

    short_description = models.CharField(max_length=240, default='', blank=True, null=True)
    text = models.TextField(default='', blank=True, null=True)

    en_short_description = models.CharField(max_length=240, default='', blank=True, null=True)
    en_text = models.TextField(default='', blank=True, null=True)

    def __str__(self):
        return 'Homepage ' + str(self.id)


class PortfolioItem(models.Model):
    """An item that will show up on the portfolio"""
    title = models.CharField(max_length=120)
    text = models.TextField(default='', blank=True, null=True)

    en_title = models.CharField(max_length=120)
    en_text = models.TextField(default='', blank=True, null=True)

    tags = models.CharField(max_length=240, default='', blank=True, null=True)
    link = models.CharField(max_length=480, default='', blank=True, null=True)
    video = models.FileField(upload_to='portfolio/videos/', blank=True, null=True)
    enabled = models.BooleanField(default=True)
    date_added = models.DateField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return str(self.title)


class Skillset(models.Model):
    """A skillset that will be shown at the skills page"""
    category = models.CharField(max_length=120)
    text = models.TextField(default='', blank=True, null=True)

    en_category = models.CharField(max_length=120)
    en_text = models.TextField(default='', blank=True, null=True)

    def __str__(self):
        return str(self.category)
