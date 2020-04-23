"""Views for the core webpage"""
#Django main imports
from django.http import HttpResponse
from django.template import loader


# Create your views here.
def home(request):
    """Homepage"""
    template = loader.get_template('core/pages/home.html')

    context = {
        '0': 0
    }
    return HttpResponse(template.render(context, request))