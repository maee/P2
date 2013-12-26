from django.conf.urls import patterns, url
from store_2 import views

urlpatterns = patterns('', url(r'^$', views.main), url(r'^8a7b9fa91c.jpg$', views.index))
