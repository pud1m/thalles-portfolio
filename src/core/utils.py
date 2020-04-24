"""Utility callbacks for the core webpage"""




def get_template_type(request):
    """Returns wether to use an endpoints or a full template to render the request"""

    if 'endpoints' in request.META.get('PATH_INFO', ''):
        return 'core/endpoint.html'
    else:
        return 'core/base.html'


def get_page_settings(page):
    """Return settings for the given page"""

    if page == 'about':
        return {
            'current_page': 'about',
            'icon_color': 'c-b-to-s1'
        }
    elif page == 'portfolio':
        return {
            'current_page': 'portfolio',
            'icon_color': 'c-b-to-s2'
        }
    elif page == 'skills':
        return {
            'current_page': 'skills',
            'icon_color': 'c-b-to-s3'
        }
    elif page == 'contact':
        return {
            'current_page': 'contact',
            'icon_color': 'c-b-to-s4'
        }
    else:
        return None
