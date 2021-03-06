# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 18:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mlisho', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dmi',
            name='dmi_value',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='dmi',
            name='livestock_id',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mlisho.Livestock'),
        ),
        migrations.AlterField(
            model_name='livestock',
            name='no_camels',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='livestock',
            name='no_cattle',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='livestock',
            name='no_donkeys',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='livestock',
            name='no_goats',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='livestock',
            name='no_sheeps',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='livestock',
            name='pastoralist_id',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mlisho.Pastoralist'),
        ),
        migrations.AlterField(
            model_name='pastoralist',
            name='familysize',
            field=models.IntegerField(choices=[(b'Average', b'Average'), (b'Bad', b'Bad'), (b'Very Bad', b'Very Bad'), (b'Unknown', b'Unknown')]),
        ),
    ]
