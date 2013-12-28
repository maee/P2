from django.template import loader, Context
from django.http import HttpResponse
import json
from store_2.models import Category, SubCategory, Pr, SlideShows, Popularity, Superior


# Create your views here.
def index(request):
    p = Pr.objects.all()[0]
    print(p.f)
    template = loader.get_template('[store_2].html')
    context = Context({'f': p.f})
    return HttpResponse(template.render(context))


def main(request):
    #slide_products = SlideShows.objects.all()[0]
    #s_pic = []
    #for product in slide_products.slide_products:
     #   s_pic.append("../static/image/" + product.picture.__str__())
    category = Category.objects.all()

    subcategory = SubCategory.objects.all()

    pic = Pr.objects.all()
    s_pic = []
    for p in pic:
        s_pic.append("../static/image/" + p.f.__str__())

    popular = Popularity.objects.all()[0]
    popular_product = popular.products.all()

    superior = Superior.objects.all()[0]
    sup = superior.products.all()

    first_cat = category.first()
    template = loader.get_template('main.html')
    context = Context({'s_pic': s_pic, 'popular': popular_product, 'sup': sup, 'category': category, 'subcategory': subcategory, 'first_cat': first_cat})
    return HttpResponse(template.render(context))


def p_list(request):
    json_data = json.dumps({'result': 1, 'page': 1, 'pageSize': 10, 'totalResults': 233, 'productList': [
        {'category': 11, 'price': 14000, 'id': 1, 'name': 'maee'}
    ]})
    return HttpResponse(json_data, content_type="application/json")