from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from mlisho.models import *
from markets.models import *
from landcover.models import *
from django.contrib.gis import admin as geoadmin
from leaflet.admin import LeafletGeoAdmin
from django.db.models import signals
from django.core.mail import send_mail
from django.contrib.auth.models import User,Group
from django.db.models import Q
from django.contrib.auth.decorators import login_required, user_passes_test,permission_required
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponseRedirect
from django_markdown.admin import MarkdownModelAdmin
from django_markdown.widgets import AdminMarkdownWidget
from django.db.models import TextField
#from django.contrib import databrowse

# Register your models here.
class PastoralistAdmin (admin.ModelAdmin):
    list_display = ('app_id','user','first_name','last_name','email','mobile','date_applied','familysize','country','district',
    	'location','village','community',
    	'area_name','description')
    search_fields = ['first_name','email'] 
    ordering = ['app_id']
    #readonly_fields = ['dc_comments ','upload_dcreport', 'final_comments']
    list_filter=('app_id','familysize')
    actions = ['send_EMAIL']

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'user', None) is None:
            obj.user = request.user
        obj.save()


    def send_EMAIL(self, request, queryset):
        from django.core.mail import send_mail
        for i in queryset:
            if i.email:
                send_mail('Service Application', 'Hello,We aknowledge receipt of your application.It will be processed soon.', 'from@example.com',[i.email], fail_silently=False)
                message_bit = "Email sent successfully!!"
            else:
                self.message_user(request, "%s" % message_bit) 
    send_EMAIL.short_description = "Send an email to selected users"

def notify_admin(sender, instance, created, **kwargs):
    '''Notify the administrator that a new user has been added.'''
    if created:
       subject = 'New user created'
       message = 'User %s was added' % instance.username
       from_addr = 'no-reply@example.com'
       recipient_list = ('kngenodev@gmail.com',)
       send_mail(subject, message, from_addr, recipient_list)

signals.post_save.connect(notify_admin, sender=User)

class LivestockAdmin (geoadmin.OSMGeoAdmin):
    list_display = ('pastoralist_id','no_cattle','no_goats','no_sheeps','no_camels','no_donkeys')
    search_fields = ['pastoralist_id',] 
    ordering = ['no_cattle']
    list_filter=('no_cattle','pastoralist_id')
    default_lon =  39.33505#37.050093#
    default_lat =  -18.8596  #-0.561360
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500

class DMIAdmin (geoadmin.OSMGeoAdmin):
    list_display = ('dmi_id','livestock_id','dmi_value','name')
    search_fields = ['dmi_value','name'] 
    ordering = ['dmi_id']
    list_filter=('dmi_id',)
    default_lon =  39.33505#36.9654#
    default_lat =  -18.8596  #-0.4030
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500

class InsuranceAdmin (geoadmin.OSMGeoAdmin):
    list_display = ('insurance_id','name','insurance_policy','email','mobile','premium','compensation','country',
    	'county','town','status','date_applied')
    search_fields = ['status','name','compensation'] 
    ordering = ['name']
    #readonly_fields = ['dc_comments ','upload_dcreport', 'final_comments']
    list_filter=('name','premium','compensation')
    default_lon =  39.33505#36.9654#
    default_lat =  -18.8596  #-0.4030
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500

class MarketAdmin(geoadmin.OSMGeoAdmin):
    list_display = ('market_id', 'market_name','livestock','price_livestock','price_kg','premium','compensation','country',
    	'county','town','status','date_applied')
    search_fields = ['status','market_name','compensation'] 
    ordering = ['market_name']
    #readonly_fields = ['dc_comments ','upload_dcreport', 'final_comments']
    list_filter=('market_name','premium','compensation')
    default_lon =  39.33505#36.9654#
    default_lat =  -18.8596  #-0.4030
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500

class AgentAdmin(geoadmin.OSMGeoAdmin):
    list_display =('user','agent_id','first_name','last_name','email','mobile','date_applied','country','province','district',
    	'location','agent_type', 'insurance_name', 'town', 'market_name', 'description')
    search_fields = ['agent_type','last_name','market_name'] 
    ordering = ['last_name', 'agent_type', 'market_name']
    #readonly_fields = ['dc_comments ','upload_dcreport', 'final_comments']
    list_filter=('last_name', 'agent_type', 'market_name')
    default_lon =  39.33505#36.9654#
    default_lat =  -18.8596  #-0.4030
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500

class Wet_Season2014Admin(geoadmin.OSMGeoAdmin):
    search_fields = ['dn'] 
    ordering = ['dn']
    #readonly_fields = ['dc_comments ','upload_dcreport', 'final_comments']
    default_lon =  39.33505#36.9654#
    default_lat =  -18.8596  #-0.4030
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500

class PastureAdmin(geoadmin.OSMGeoAdmin):
    search_fields = ['dn'] 
    ordering = ['dn']
    #readonly_fields = ['dc_comments ','upload_dcreport', 'final_comments']
    default_lon =  39.33505#36.9654#
    default_lat =  -18.8596  #-0.4030
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500

class LandmarkAdmin(geoadmin.OSMGeoAdmin):
    search_fields = ['name'] 
    ordering = ['name']
    #readonly_fields = ['dc_comments ','upload_dcreport', 'final_comments']
    default_lon =  39.33505#36.9654#
    default_lat =  -18.8596  #-0.4030
    default_zoom = 14
    map_info = True
    map_width = 700
    map_height = 500

admin.site.register(Pastoralist, PastoralistAdmin)
admin.site.register(Livestock, LivestockAdmin)
admin.site.register(DMI, DMIAdmin)
admin.site.register(Insurance, InsuranceAdmin)
admin.site.register(Market, MarketAdmin)
admin.site.register(Agent, AgentAdmin)
admin.site.register(Wet_Season2014, Wet_Season2014Admin)
admin.site.register(Pasture, PastureAdmin)
admin.site.register(Landmark, LandmarkAdmin)

