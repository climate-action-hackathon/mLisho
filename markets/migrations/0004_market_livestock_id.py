# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 18:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mlisho', '0002_auto_20160316_2144'),
        ('markets', '0003_auto_20160316_2117'),
    ]

    operations = [
        migrations.AddField(
            model_name='market',
            name='livestock_id',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mlisho.Livestock'),
        ),
    ]
