# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 17:30
from __future__ import unicode_literals

from django.conf import settings
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
            name='DMI',
            fields=[
                ('dmi_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('dmi_value', models.IntegerField(max_length=50)),
            ],
            options={
                'managed': True,
                'verbose_name_plural': 'DMI',
            },
        ),
        migrations.CreateModel(
            name='Livestock',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('no_cattle', models.IntegerField(max_length=50)),
                ('no_goats', models.IntegerField(max_length=50)),
                ('no_sheeps', models.IntegerField(max_length=50)),
                ('no_camels', models.IntegerField(max_length=50)),
                ('no_donkeys', models.IntegerField(max_length=50)),
            ],
            options={
                'managed': True,
                'verbose_name_plural': 'Livestocks',
            },
        ),
        migrations.CreateModel(
            name='Pastoralist',
            fields=[
                ('app_id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('email', models.EmailField(help_text=b'user@user.com', max_length=50)),
                ('mobile', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True)),
                ('familysize', models.IntegerField(choices=[(b'Average', b'Average'), (b'Bad', b'Bad'), (b'Very Bad', b'Very Bad'), (b'Unknown', b'Unknown')], max_length=15)),
                ('community', models.CharField(choices=[(b'Unchecked', b'Unchecked'), (b'Checked', b'Checked'), (b'Approved', b'Approved'), (b'Closed', b'Closed')], max_length=15)),
                ('country', models.CharField(choices=[(b'Githii', b'Githii'), (b'Muhito', b'Muhito'), (b'Gakindu', b'Gakindu'), (b'Gikondi', b'Gikondi')], max_length=50)),
                ('province', models.CharField(choices=[(b'Githii', b'Githii'), (b'Muhito', b'Muhito'), (b'Gakindu', b'Gakindu'), (b'Gikondi', b'Gikondi')], max_length=15)),
                ('district', models.CharField(choices=[(b'Githii', b'Githii'), (b'Muhito', b'Muhito'), (b'Gakindu', b'Gakindu'), (b'Gikondi', b'Gikondi')], max_length=15)),
                ('location', models.CharField(choices=[(b'Githii', b'Githii'), (b'Muhito', b'Muhito'), (b'Gakindu', b'Gakindu'), (b'Gikondi', b'Gikondi')], max_length=15)),
                ('village', models.CharField(choices=[(b'Githii', b'Githii'), (b'Muhito', b'Muhito'), (b'Gakindu', b'Gakindu'), (b'Gikondi', b'Gikondi')], max_length=15)),
                ('area_name', models.CharField(max_length=15, null=True)),
                ('description', models.TextField(max_length=256)),
                ('date_applied', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'managed': True,
                'verbose_name_plural': 'Pastoralists',
            },
        ),
        migrations.AddField(
            model_name='livestock',
            name='pastoralist_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mlisho.Pastoralist'),
        ),
        migrations.AddField(
            model_name='dmi',
            name='livestock_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mlisho.Livestock'),
        ),
    ]
