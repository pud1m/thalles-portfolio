"""Callbacks to get page data"""
#Model imports
from .models import HomePage, PortfolioItem, Skillset



def about(lang, args):
    """Fetches the data for the about page"""

    data = HomePage.objects.all().first()

    if not data:
        return None
    elif lang == 'pt':
        return {
            'headline': data.short_description,
            'description': data.text,
            'picture': data.picture
        }

    return {
        'headline': data.en_short_description,
        'description': data.en_text,
        'picture': data.picture
    }


def portfolio(lang, args=None):
    """Fetches the data for the portfolio page"""

    if args is None:
        initial = 0
    else:
        initial = args


    #Takes only the response from the initial parameter and the next
    items = PortfolioItem.objects.filter(enabled=True).order_by('-date_added')[initial:initial + 2]

    item_list = []

    for item in items:
        taglist = (item.tags).split(',')
        if lang == 'pt':
            description = item.text
            name = item.title
        else:
            description = item.en_text
            name = item.en_title

        obj = {
            'id': item.id,
            'name': name,
            'video': item.video,
            'tags': taglist,
            'description': description,
            'website': item.link
        }
        item_list.append(obj)

    return item_list


def skills(lang, args):
    """Fetches the data for the skills page"""

    this_skills = Skillset.objects.all()

    skill_list = []

    for skill in this_skills:
        if lang == 'pt':
            obj = {
                'title': skill.category,
                'text': skill.text
            }
        else:
            obj = {
                'title': skill.en_category,
                'text': skill.en_text
            }
        skill_list.append(obj)

    return skill_list


def contact(lang, args):
    """Fetches the data for the contact page"""
    return None


