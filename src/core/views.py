"""Views for the core webpage"""
#Django main imports
from django.http import HttpResponse
from django.template import loader
#Utils
from .utils import get_template_type, get_page_settings



def lang_pick(request):
    """Language picker page, also the homepage"""
    template = loader.get_template('core/pages/lang_pick.html')

    context = {
        'type': get_template_type(request),
        'no_shrink': True
    }
    return HttpResponse(template.render(context, request))


def about(request):
    """About Page"""
    template = loader.get_template('core/pages/about.html')

    context = {
        'type': get_template_type(request),
        'page_settings': get_page_settings('about')
    }
    return HttpResponse(template.render(context, request))


def portfolio(request):
    """Portfolio Page"""
    template = loader.get_template('core/pages/portfolio.html')

    context = {
        'type': get_template_type(request),
        'page_settings': get_page_settings('portfolio')
    }
    return HttpResponse(template.render(context, request))


def skills(request):
    """Skills Page"""
    template = loader.get_template('core/pages/skills.html')

    context = {
        'type': get_template_type(request),
        'page_settings': get_page_settings('skills')
    }
    return HttpResponse(template.render(context, request))