import os
from django.contrib.gis.utils import LayerMapping
from django.contrib.gis.db import models
from landcover.models import Wet_Season2014


wet_season2014_mapping = {
    'dn' : 'DN',
    'geom' : 'MULTIPOLYGON',
}

wetseason2014_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/wet_season_2014rainfall.shp'))

def run(verbose=True):
    lm = LayerMapping(Wet_Season2014, wetseason2014_shp, wet_season2014_mapping,transform=True, encoding='iso-8859-1')
    lm.save(strict=True, verbose=verbose)

