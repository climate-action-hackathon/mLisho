# This is an auto-generated Django model module created by ogrinspect.
import os
from django.contrib.gis.utils import LayerMapping
from django.contrib.gis.db import models

# Auto-generated `LayerMapping` dictionary for IHE_Borehole model
ihe_borehole_mapping = {
    'stn' : 'Stn',
    'longitude' : 'Longitude',
    'latitude' : 'Latitude',
    'ec (us/cm)' : 'EC (us/cm)',
    'hco3 (mg/l' : 'HCO3 (mg/L',
    'cl (mg/l)' : 'Cl (mg/L)',
    'no3-n (mg/' : 'NO3-N (mg/',
    'so4 (mg/l)' : 'SO4 (mg/L)',
    'na (mg/l)' : 'Na (mg/L)',
    'ca (mg/l)' : 'Ca (mg/L)',
    'k (mg/l)' : 'K (mg/L)',
    'mg (mg/l)' : 'Mg (mg/L)',
    'bh_attribu' : 'BH_attribu',
    'geom' : 'MULTIPOINT',
}

ihe_borehole = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/ihe_borehole.shp'))

def run(verbose=True):
    lm = LayerMapping(administration, ihe_borehole, ihe_borehole_mapping,transform=True, encoding='iso-8859-1')
    lm.save(strict=True, verbose=verbose)
