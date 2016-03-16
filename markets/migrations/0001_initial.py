# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 17:12
from __future__ import unicode_literals

import datetime
from django.conf import settings
import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Agent',
            fields=[
                ('agent_id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('email', models.EmailField(help_text='user@user.com', max_length=50)),
                ('mobile', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True)),
                ('country', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], max_length=50)),
                ('province', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], max_length=15)),
                ('district', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], max_length=15)),
                ('location', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], max_length=15)),
                ('agent_type', models.IntegerField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], max_length=15)),
                ('town', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], max_length=15)),
                ('market_name', models.CharField(max_length=15, null=True)),
                ('description', models.TextField(max_length=256)),
                ('date_applied', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'managed': True,
                'verbose_name_plural': 'Agent',
            },
        ),
        migrations.CreateModel(
            name='Insurance',
            fields=[
                ('insurance_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('insurance_policy', models.CharField(max_length=50)),
                ('email', models.EmailField(help_text='user@user.com', max_length=50)),
                ('mobile', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True)),
                ('premium', models.CharField(help_text='Kshs.', max_length=50)),
                ('compensation', models.CharField(help_text='Kshs.', max_length=50)),
                ('category', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], max_length=50)),
                ('country', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], default='Insurance', max_length=50)),
                ('county', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], default='Insurance', max_length=50)),
                ('town', models.CharField(help_text='Enkara', max_length=50, null=True)),
                ('status', models.CharField(choices=[('Drought', 'Drought'), ('Floods', 'Floods')], default='Drought', max_length=15)),
                ('date_applied', models.DateTimeField(auto_now_add=True)),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=4326)),
            ],
            options={
                'managed': True,
                'verbose_name_plural': 'Insurance',
            },
        ),
        migrations.CreateModel(
            name='Market',
            fields=[
                ('market_id', models.AutoField(primary_key=True, serialize=False)),
                ('market_name', models.CharField(max_length=50)),
                ('livestock', models.EmailField(help_text='user@user.com', max_length=50)),
                ('price_livestock', models.CharField(help_text='Kshs.', max_length=50)),
                ('price_kg', models.CharField(help_text='Kshs.', max_length=50)),
                ('premium', models.CharField(help_text='Kshs.', max_length=50)),
                ('compensation', models.CharField(help_text='Kshs.', max_length=50)),
                ('category', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], max_length=50)),
                ('county', models.CharField(choices=[('Insurance', 'Insurance'), ('Market', 'Market')], default='Insurance', max_length=50)),
                ('closest_town', models.CharField(help_text='Enkara', max_length=50, null=True)),
                ('status', models.CharField(choices=[('Drought', 'Drought'), ('Floods', 'Floods')], default='Drought', max_length=15)),
                ('date_applied', models.DateTimeField(auto_now_add=True)),
                ('geom', django.contrib.gis.db.models.fields.PointField(srid=4326)),
            ],
            options={
                'managed': True,
                'verbose_name_plural': 'Markets',
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activation_key', models.CharField(blank=True, max_length=40)),
                ('key_expires', models.DateTimeField(default=datetime.date(2016, 3, 16))),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'User profiles',
            },
        ),
        migrations.AddField(
            model_name='agent',
            name='insurance_name',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='markets.Insurance'),
        ),
        migrations.AddField(
            model_name='agent',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
