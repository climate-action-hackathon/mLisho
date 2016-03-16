from django.db import models
from django.contrib.gis.db import models
import datetime 
from django.utils import timezone
from django.db.models import signals
from django.forms import TextInput
from django.contrib.auth.models import User,Group
from django.core.validators import MaxLengthValidator,MinLengthValidator
from django.template.defaultfilters import date
from django.core.urlresolvers import reverse
from phonenumber_field.modelfields import PhoneNumberField
#from django_hstore import hstore
from django.contrib.gis.db import models
from django.core.validators import RegexValidator
def upload_application(instance, filename):
   # return "title_images/%s" % (filename)
    return '/'.join(['application_docs', str(instance.category), filename])

def upload_report(instance, filename):
    return "report_images/%s" % (filename)

def upload_docs(instance, filename):
    return "documents/%s" % (filename)

country = (
    ('Kenya','Kenya'),
    ('Tanzania','Tanzania'),
    ('Mali','Mali'),
    ('Botswana','Botswana'),

    )
provinces = (
    ('Rift Valley','Rift Valley'),
    ('North Easter','North Easter'),
    ('Eastern','Eastern'),
    ('Coast','Coast'),

    )
districts= (
    ('Githii','Githii'),
    ('Muhito','Muhito'),
    ('Gakindu','Gakindu'),
    ('Gikondi','Gikondi'),

    )

locations = (
    ('Lemek','Lemek'),
    ('Ol Chorro','Ol Chorro'),
    ('Talek','Talek'),
    ('Keekerok','Keekerok'),

    )
villages = (
    ('Lemek','Lemek'),
    ('Ol Chorro','Ol Chorro'),
    ('Talek','Talek'),
    ('Keekerok','Keekerok'),

    )
community = (
    ('Lemek','Lemek'),
    ('Ol Chorro','Ol Chorro'),
    ('Talek','Talek'),
    ('Keekerok','Keekerok'),

    )

familysize = (
        ('5','5'),
        ('10','10'),
        ('15','15'),
        ('25','25'),

    )
livestock = (
        ('Cattle','Cattle'),
        ('Goats','Goats'),
        ('Sheep','Sheep'),
        ('Camels','Annual GM'),
        ('Donkeys','Donkeys'),
    )
DMI = (
    ('25','25'),
    ('50','50'),
    ('100','100'),
    ('150','150'),

)
# Create your models here.
class UserProfile(models.Model):
    
    user = models.OneToOneField(User)
    activation_key = models.CharField(max_length=40, blank=True)
    key_expires = models.DateTimeField(default=datetime.date.today()) 
    
    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural='User profiles'
        
class Pastoralist(models.Model):
    user = models.OneToOneField(User, unique=False)
    app_id=models.AutoField(primary_key=True)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    email = models.EmailField(max_length=50, help_text='user@user.com')
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    mobile = models.CharField(validators=[phone_regex], blank=True, max_length=15) 
    familysize =models.CharField(choices=familysize, null=True,blank=True, max_length=50)
    country = models.CharField(max_length=50, choices=country, null=True,blank=True)
    district=models.CharField(max_length=15,choices= districts, null=True,blank=True)
    location=models.CharField(max_length=15,choices=locations, null=True,blank=True)
    village=models.CharField(max_length=15,choices=villages, null=True,blank=True)
    community=models.CharField(max_length=15, choices=community, null=True,blank=True) 
    area_name=models.CharField(max_length=15,null=True)
    description = models.TextField(max_length=256, null=True,blank=True)
    date_applied = models.DateTimeField(auto_now_add=True)
    #status = models.CharField(max_length=15, null=False, choices=status, default=status[0][0])
    geom = models.PointField(srid=4326)
    objects = models.GeoManager()
    def __unicode__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Pastoralists" 
        managed = True
    
class Livestock(models.Model):
    """docstring for Livestocks"""
    id= models.AutoField(primary_key=True)
    pastoralist_id = models.OneToOneField(Pastoralist, blank=True, null=True)
    no_cattle= models.IntegerField(null=False)
    no_goats= models.IntegerField(null=False)
    no_sheeps= models.IntegerField(null=False)
    no_camels= models.IntegerField(null=False)
    no_donkeys= models.IntegerField(null=False)
  
    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Livestocks" 
        managed = True

class DMI(models.Model):
    """docstring for DMI"""
    dmi_id = models.AutoField(primary_key=True)
    livestock_id = models.OneToOneField(Livestock, blank=True, null=True)
    name= models.CharField(max_length=50, null=False)
    dmi_value= models.IntegerField(null=False)
  
    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = "DMI" 
        managed = True

#Administrative boundaries
#Countries
#Provinces
#Districts
#Locations
#Villages
#Areanames
