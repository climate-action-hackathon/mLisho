import os
from django.contrib.gis.utils import LayerMapping
from django.contrib.gis.db import models
from landcover.models import Pasture

pasture_mapping = {
    'dn' : 'DN',
    'geom' : 'MULTIPOLYGON',
}

pasture_shp = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/mamase_vegetation_classification.shp'))

def run(verbose=True):
    lm = LayerMapping(Pasture, pasture_shp, pasture_mapping,transform=True, encoding='iso-8859-1')
    lm.save(strict=True, verbose=verbose)
