# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 22:06
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mlisho', '0003_userprofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='key_expires',
            field=models.DateTimeField(default=datetime.date(2016, 3, 17)),
        ),
    ]
