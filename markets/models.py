from __future__ import unicode_literals
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
from mlisho.models import Livestock

incidence_status = (
        ('Drought','Drought'),
        ('Floods','Floods'),
    )

agent_type = (
        ('Insurance','Insurance'),
        ('Market','Market'),
    )

country = (
    ('Kenya','Kenya'),
    ('Tanzania','Tanzania'),
    ('Mali','Mali'),
    ('Botswana','Botswana'),

    )
province = (
    ('Rift Valley','Rift Valley'),
    ('North Easter','North Easter'),
    ('Eastern','Eastern'),
    ('Coast','Coast'),

    )
county = (
    ('Narok','Narok'),
    ('Bomet','Bomet'),
    ('Machakos','Machakos'),
    ('Garissa','Garissa'),

    )

district= (
    ('Githii','Githii'),
    ('Muhito','Muhito'),
    ('Gakindu','Gakindu'),
    ('Gikondi','Gikondi'),

    )

location = (
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


town = (
        ('Narok','Narok'),
        ('El Ekare','El Ekare'),
    )

# Create your models here

# Create your models here.
class Insurance (models.Model):
    insurance_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    insurance_policy=models.CharField(max_length=50)
    email = models.EmailField(max_length=50, help_text='user@user.com')
    mobile = PhoneNumberField(null=True,blank=True)
    premium = models.CharField(max_length=50, help_text="Kshs.")
    compensation = models.CharField(max_length=50, help_text="Kshs.")
    country = models.CharField(max_length=50, choices=country, default=country[0][0]) 
    county = models.CharField(max_length=50, choices=county, default=county[0][0])
    town = models.CharField(max_length=50, null=True, help_text= 'Enkara')
    status = models.CharField(max_length=15, null=False, choices=incidence_status, default=incidence_status[0][0])
    date_applied = models.DateTimeField(auto_now_add=True)
    geom = models.PointField(srid=4326)
    objects = models.GeoManager()

    def __unicode__(self):
        return self.insurance_policy

    @property
    def timeframe(self):
        return '%s - present' % date(self.date_applied, "n/j/Y")
    
    class Meta:
        verbose_name_plural = "Insurance" 
        managed = True
 

class Market (models.Model):
    market_id = models.AutoField(primary_key=True)
    livestock_id=models.OneToOneField(Livestock, blank=True, null=True)
    market_name = models.CharField(max_length=50)
    livestock = models.EmailField(max_length=50, help_text='user@user.com')
    price_livestock = models.CharField(max_length=50, help_text="Kshs.")
    price_kg = models.CharField(max_length=50, help_text="Kshs.")
    premium = models.CharField(max_length=50, help_text="Kshs.")
    compensation = models.CharField(max_length=50, help_text="Kshs.")
    country = models.CharField(max_length=50, choices=country)
    county = models.CharField(max_length=50, choices=county, default=county[0][0])
    town = models.CharField(max_length=50, null=True, help_text= 'Enkara')
    status = models.CharField(max_length=15, null=False, choices=incidence_status, default=incidence_status[0][0])
    date_applied = models.DateTimeField(auto_now_add=True)
    geom = models.PointField(srid=4326)
    objects = models.GeoManager()

    def __unicode__(self):
        return self.Market_policy

    @property
    def timeframe(self):
        return '%s - present' % date(self.date_applied, "n/j/Y")
    
    class Meta:
        verbose_name_plural = "Markets" 
        managed = True
 
class Agent(models.Model):
    user = models.OneToOneField(User, unique=False)
    agent_id=models.AutoField(primary_key=True)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    email = models.EmailField(max_length=50, help_text='user@user.com')
    mobile = PhoneNumberField(null=True,blank=True)
    country = models.CharField(max_length=50, choices=country)
    province=models.CharField(max_length=15,choices=province)
    district=models.CharField(max_length=15,choices= district)
    location=models.CharField(max_length=15,choices=location)
    agent_type = models.CharField(max_length=15, choices=agent_type)
    insurance_name = models.OneToOneField(Insurance, blank=True, null=True)
    market_name = models.OneToOneField(Market, blank=True, null=True)
    town =models.CharField(max_length=15,choices=town)
    market_name=models.CharField(max_length=15,null=True)
    description = models.TextField(max_length=256)
    date_applied = models.DateTimeField(auto_now_add=True)
        
    def __unicode__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Agent" 
        managed = True