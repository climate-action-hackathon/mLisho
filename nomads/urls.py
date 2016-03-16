from django.conf.urls import patterns, include, url
from django.contrib import admin

import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.views.generic import ListView
from django.views.generic import TemplateView
from django.contrib.auth import views
from django.contrib.auth import urls
#from registration.backends.simple.views import *

admin.site.site_header = 'Nomads - Saving Our Livelihoods '

admin.autodiscover()
urlpatterns = patterns('',

			    url(r'^admin/', include(admin.site.urls)),
			    url(r'^markdown/', include("django_markdown.urls")),
			    url(r'^calendar/', include('django_bootstrap_calendar.urls')),
			    url(r'^', include('mlisho.urls')), 
			    #url(r'^', include('markets.urls')),
			    #url(r'^', include('landcover.urls')),
			    #url(r'^', include('weather.urls')),    
)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)+ static(settings.STATIC_URL, document_root=settings.STATIC_URL)

