# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 22:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('markets', '0004_market_livestock_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='insurance',
            name='category',
        ),
        migrations.RemoveField(
            model_name='market',
            name='category',
        ),
        migrations.AlterField(
            model_name='agent',
            name='country',
            field=models.CharField(choices=[('Kenya', 'Kenya'), ('Tanzania', 'Tanzania'), ('Mali', 'Mali'), ('Botswana', 'Botswana')], max_length=50),
        ),
        migrations.AlterField(
            model_name='agent',
            name='district',
            field=models.CharField(choices=[('Githii', 'Githii'), ('Muhito', 'Muhito'), ('Gakindu', 'Gakindu'), ('Gikondi', 'Gikondi')], max_length=15),
        ),
        migrations.AlterField(
            model_name='agent',
            name='location',
            field=models.CharField(choices=[('Lemek', 'Lemek'), ('Ol Chorro', 'Ol Chorro'), ('Talek', 'Talek'), ('Keekerok', 'Keekerok')], max_length=15),
        ),
        migrations.AlterField(
            model_name='agent',
            name='province',
            field=models.CharField(choices=[('Rift Valley', 'Rift Valley'), ('North Easter', 'North Easter'), ('Eastern', 'Eastern'), ('Coast', 'Coast')], max_length=15),
        ),
        migrations.AlterField(
            model_name='agent',
            name='town',
            field=models.CharField(choices=[('Narok', 'Narok'), ('El Ekare', 'El Ekare')], max_length=15),
        ),
        migrations.AlterField(
            model_name='insurance',
            name='country',
            field=models.CharField(choices=[('Kenya', 'Kenya'), ('Tanzania', 'Tanzania'), ('Mali', 'Mali'), ('Botswana', 'Botswana')], default='Kenya', max_length=50),
        ),
        migrations.AlterField(
            model_name='insurance',
            name='county',
            field=models.CharField(choices=[('Narok', 'Narok'), ('Bomet', 'Bomet'), ('Machakos', 'Machakos'), ('Garissa', 'Garissa')], default='Narok', max_length=50),
        ),
        migrations.AlterField(
            model_name='market',
            name='country',
            field=models.CharField(choices=[('Kenya', 'Kenya'), ('Tanzania', 'Tanzania'), ('Mali', 'Mali'), ('Botswana', 'Botswana')], max_length=50),
        ),
        migrations.AlterField(
            model_name='market',
            name='county',
            field=models.CharField(choices=[('Narok', 'Narok'), ('Bomet', 'Bomet'), ('Machakos', 'Machakos'), ('Garissa', 'Garissa')], default='Narok', max_length=50),
        ),
    ]
