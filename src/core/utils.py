"""Utility callbacks for the core webpage"""
#Django main imports
from django.shortcuts import redirect
from django.http import HttpResponse
#Page data loaders
from . import page_data



def get_template_type(request):
    """Returns wether to use an endpoints or a full template to render the request"""

    if request.headers.get('X-ic-request', None) is not None:
        return 'core/endpoint.html'

    return 'core/base.html'


def get_page_settings(page, language):
    """Return settings for the given page"""

    if page == 'about':
        color = 's1'
    elif page =='portfolio':
        color = 's2'
    elif page =='skills':
        color = 's3'
    elif page =='contact':
        color = 's4'
    else:
        color = ''

    return {
        'current_page': page,
        'icon_color': 'c-b-to-' + color,
        'stamp_color': 'c-' + color,
        'language': language
    }


def get_language(request):
    """Gets the current language the user has set. If none, returns a redirect notice"""

    page_lang = str(request.COOKIES.get('page_lang', 'not_set'))

    if page_lang == 'not_set':
        return 'redirect'

    return page_lang


def switch_language(lang):
    """Returns the opposite of the current language"""
    if lang == 'en':
        return 'pt'
    return 'en'


def render_page(template, request):
    """Renders the page based on context, template, request and language parameters"""

    current_page = request.META.get('RAW_URI', '/').replace('/', '').split('?', 1)[0]
    current_page_lang = get_language(request)
    request_set_lang = request.GET.get('ic-trigger-id', '')

    #Checks if the request is asking to se the language.
    #If it isn't and there is no language set, redirect to lang_pick
    if 'lang_' in request_set_lang:
        if request_set_lang == 'topbar_lang_switch':
            current_page_lang = switch_language(current_page_lang)
        else:
            current_page_lang = request_set_lang.replace('lang_', '')
    elif current_page_lang == 'redirect' or (current_page_lang not in ('pt', 'en')):
        return redirect('/')

    context = {
        'type': get_template_type(request),
        'page_settings': get_page_settings(current_page, current_page_lang),
        'data': getattr(page_data, current_page)(current_page_lang, None)
    }
    response = HttpResponse(template.render(context, request))

    #Sets the language in the lang cookie
    response.set_cookie(
        'page_lang',
        current_page_lang,
        max_age=432000,
        samesite='Strict',
        httponly=True)

    return response
