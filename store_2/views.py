from django.template import loader, Context
from django.http import HttpResponse

from store_2.models import Pr


# Create your views here.
def index(request):
    p = Pr.objects.all()[0]
    print(p.f)
    template = loader.get_template('[store_2].html')
    context = Context({'f': p.f})
    return HttpResponse(template.render(context))


def main(request):
    template = loader.get_template('main.html')
    context = Context()
    return  HttpResponse(template.render(context))