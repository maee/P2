from _lsprof import profiler_entry
from django.template import loader, Context
from django.http import HttpResponse
import json
from urllib.parse import urlparse
from store_2.models import Category, SubCategory, Slider, Popular, Superiors, Products


# Create your views here.
def index(request):
    #p = Pr.objects.all()[0]
    #print(p.f)
    template = loader.get_template('[store_2].html')
    context = Context()
    return HttpResponse(template.render(context))


def main(request):
    #slide_products = SlideShows.objects.all()[0]
    #s_pic = []
    #for product in slide_products.slide_products:
     #   s_pic.append("../static/image/" + product.picture.__str__())
    category = Category.objects.all()

    subcategory = SubCategory.objects.all()

    slider = Slider.objects.all()[0]
    slider_product = slider.slide_products.all()

    #pic = Pr.objects.all()
    #s_pic = []
    #for p in pic:
    #    s_pic.append("../static/image/" + p.f.__str__())

    popular = Popular.objects.all()[0]
    popular_product = popular.products.all()

    superior = Superiors.objects.all()[0]
    sup = superior.products.all()

    first_cat = category.first()
    template = loader.get_template('main.html')
    context = Context({'popular': popular_product, 'sup': sup, 'category': category, 'slider_product': slider_product,
                       'subcategory': subcategory, 'first_cat': first_cat})
    return HttpResponse(template.render(context))


def p_list(request):
    products = Products.objects.all()
    product_list = []
    counter = 0
    if request.GET.dict()['search'] != '':
        print("searchhhhhhhhhhhhhhhhhhh")
        for product in products:
            if request.GET.dict()['search'].__str__() in product.name.__str__() or request.GET.dict()['search'].__str__() in product.desc.__str__() or request.GET.dict()['search'].__str__() in product.subcategory.__str__():
                print("MAeeeeeee")
                product_data = {'category': product.subcategory.name, 'price': product.p, 'description': product.desc, 'name': product.name, 'pic': "../static/image/" + product.picture.__str__()}
                product_list.append(product_data)
                counter += 1
        json_data = json.dumps({'result': 1, 'page': 1, 'pageSize': 10, 'totalResults': counter, 'productList': product_list})
        return HttpResponse(json_data, content_type="application/json")

    for product in products:
        print(product.subcategory)
        print(request.GET.dict()['category'])
        if product.subcategory.__str__() == request.GET.dict()['category'].__str__():
            print(True)
            product_data = {'category': product.subcategory.name, 'price': product.p, 'description': product.desc,
                            'name': product.name, 'pic': "../static/image/" + product.picture.__str__()}
            product_list.append(product_data)
            counter += 1
    json_data = json.dumps({'result': 1, 'page': 1, 'pageSize': 10, 'totalResults': counter, 'productList': product_list})
    return HttpResponse(json_data, content_type="application/json")