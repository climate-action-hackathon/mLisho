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

# Create your models here.
class Pasture(models.Model):
    dn = models.IntegerField()
    geom = models.MultiPolygonField(srid=4326)


class Wet_Season2014(models.Model):
    dn = models.FloatField()
    geom = models.MultiPolygonField(srid=4326)


class Landmark(models.Model):
    name = models.CharField(max_length=50)
    geom = models.MultiPointField(srid=4326)

