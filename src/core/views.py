"""Views for the core webpage"""
#Django main imports
from django.http import HttpResponse
from django.template import loader
#Utils
from .utils import render_page, get_template_type, get_language
#Page data loaders
from .page_data import portfolio as get_portfolio_data



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

    return render_page(template, request)


def portfolio(request):
    """Portfolio Page"""
    template = loader.get_template('core/pages/portfolio.html')

    return render_page(template, request)


def portfolio_endpoint(request, page):
    """Endpoint to fetch portfolio-items from"""
    template = loader.get_template('core/components/portfolio-card-group.html')

    lang = get_language(request)

    context = {
        'data': get_portfolio_data(lang, page),
        'next_page': int(page) + 2
    }
    return HttpResponse(template.render(context, request))


def skills(request):
    """Skills Page"""
    template = loader.get_template('core/pages/skills.html')

    return render_page(template, request)


def contact(request):
    """Contact Page"""
    template = loader.get_template('core/pages/contact.html')

    return render_page(template, request)
