# Generated by Django 4.2.2 on 2023-07-11 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_levil_barra', '0002_producto_precio_alter_producto_imagen'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='cantidad',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]