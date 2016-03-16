from django.conf.urls import patterns, include, url
from django.contrib import admin
from mlisho.views import * 
from landcover.models import * 
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.views.generic import ListView
from mlisho.models import *
from django.views.generic import TemplateView
from djgeojson.views import GeoJSONLayerView
from django.contrib.auth import views
from django.contrib.auth import urls


urlpatterns = patterns('',    	
	url(r'^$', TemplateView.as_view
        (template_name='temp/index.html'), name='index'),
    url(r'^contacts/$','mlisho.views.contact', name='contacts'),
    url(r'^register/$', 'mlisho.views.register_user', name='register_user'),
    #url(r'^events/(?P&lt;event_id&gt;\d+)/export/', 'mlisho.views.export', name="event_ics_export"),
    url(r'^calendars/$', 'mlisho.views.calendar', name='calendar'),
    #url(r'^index/', BlogIndex.as_view(), name="indexs"),
    url(r'^about/', 'mlisho.views.about', name="about"),
    url(r'^map/$', 'mlisho.views.map', name='map'),
    url(r'^markets/$', 'mlisho.views.market_portal', name='market'),
    url(r'^market_report/$', 'mlisho.views.add_point', name='market_report'),
    url(r'^pasture_data/$', GeoJSONLayerView.as_view(model=Pasture, properties=('dn')), name='pasture_data'),
    url(r'^rainfall2014_data/$', GeoJSONLayerView.as_view(model=Wet_Season2014, properties=('dn')), name='rainfall2014_data'),
    url(r'^market_data/$', GeoJSONLayerView.as_view(model=Market, properties=('market_id', 'market_name','livestock','price_livestock','price_kg','premium','compensation','category','country',
        'county','town','status','date_applied')), name='market_data'),
    url(r'^pastoralist_data/$', GeoJSONLayerView.as_view(model=Pastoralist, properties=('last_name','mobile','geom',)), name='pastoralist_data'),
    url(r'^landmark_data/$', GeoJSONLayerView.as_view(model=Landmark, properties=('name','geom')), name='landmark_data'),
    url(r'^points/$', 'mlisho.views.points', name='points'),
    url(r'^accounts/login/$', 'mlisho.views.user_login', name='login'),
    url(r'^accounts/logout/', 'mlisho.views.user_logout', name='loggedout'),                                                                                                                    
    url(r'^accounts/', include('registration.backends.simple.urls')),
    url(r'^register_success/', ('mlisho.views.register_success')),
    url(r'^apply/$', 'mlisho.views.pastoralist_portal', name='apply'),
    url(r'^status/$', 'mlisho.views.status', name='status'),    
    url(r'^add_point/error$', 'mlisho.views.form_error'),
    url(r'^add_point/success$', 'mlisho.views.form_success'),
    #url(r'^grappelli/', include('grappelli.urls')),
    url(r'^confirm/(?P<activation_key>\w+)/', ('mlisho.views.register_confirm')),
    url(r'^password/$', 'django.contrib.auth.views.password_reset', {}, 'password_reset'),
    url(r'^accounts/password_change/$','django.contrib.auth.views.password_change', 
        {'post_change_redirect' : '/accounts/password_change/done/'}, 
        name="password_change"), 
    url(r'^accounts/password_change/done/$','django.contrib.auth.views.password_change_done'),
    url(r'^accounts/password_reset/$', 
        'django.contrib.auth.views.password_reset', 
        {'post_reset_redirect' : '/accounts/password_reset/mailed/'},
        name="password_reset"),
    url(r'^accounts/password_reset/mailed/$',
        'django.contrib.auth.views.password_reset_done'),
    url(r'^accounts/password_reset/(?P<uidb64>[0-9A-Za-z]{1,13})-(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        'django.contrib.auth.views.password_reset_confirm', 
        {'post_reset_redirect' : '/accounts/password_reset/complete/'}),
    url(r'^accounts/password_reset/complete/$', 
        'django.contrib.auth.views.password_reset_complete') 
					    
)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
