from django.conf.urls import patterns, url
from store_2 import views

urlpatterns = patterns('', url(r'^$', views.main), url(r'^product/list/$', views.p_list),)
