from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'P2_store_2.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^store/', include('store_2.urls')),
    #url(r'^store/product/list/$', include('store_2.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
