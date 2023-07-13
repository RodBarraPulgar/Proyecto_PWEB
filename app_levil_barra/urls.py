from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index' ),
    path('galeria', views.galeria, name='galeria' ),
    path('nosotros', views.nosotros, name='nosotros' ),
    path('contacto', views.contacto, name='contacto' ),
    path('ubicacion', views.ubicacion, name='ubicacion' ),
    path('productos', views.productos, name="productos"),
    path('agregar/', views.agregar, name="agregar"),
    path('agregarrec/', views.agregarrec, name="agregarrec"),
    path('eliminar/<int:id>/', views.eliminar, name='eliminar'),
    path('actualizar/<int:id>/', views.actualizar, name="actualizar"),
    path('actualizarrec/<int:id>/', views.actualizarrec, name="actualizarrec"),
    path('register/', views.register, name='register'),
    path('productos/<int:id>/', views.obtener_producto, name='obtener_producto'),
]
