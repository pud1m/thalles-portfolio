# Generated by Django 3.0.5 on 2020-04-25 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='homepage',
            name='en_short_description',
            field=models.CharField(blank=True, default='', max_length=240, null=True),
        ),
        migrations.AddField(
            model_name='homepage',
            name='en_text',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AddField(
            model_name='portfolioitem',
            name='en_text',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AddField(
            model_name='portfolioitem',
            name='en_title',
            field=models.CharField(default='', max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='skillset',
            name='en_category',
            field=models.CharField(default='', max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='skillset',
            name='en_text',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
