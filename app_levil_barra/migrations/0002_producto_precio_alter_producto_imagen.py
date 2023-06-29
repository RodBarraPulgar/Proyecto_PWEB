# Generated by Django 4.2.2 on 2023-06-27 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_levil_barra', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='precio',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='producto',
            name='imagen',
            field=models.ImageField(null=True, upload_to='productos/'),
        ),
    ]