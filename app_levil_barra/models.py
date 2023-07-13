from django.db import models

# Create your models here.

class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)
    precio = models.IntegerField()
    imagen = models.ImageField(upload_to="productos/", null=True)
    cantidad = models.IntegerField()

    def subtotal(self):
            return self.precio * self.cantidad

