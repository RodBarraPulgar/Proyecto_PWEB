import os
from django.conf import settings
from django.shortcuts import redirect, render
from .models import Producto
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, authenticate, login
from .forms import AgregarProductoForm
from .forms import CustomUserCreationForm
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

def index(request):
    context={}
    return render(request,'app_levil_barra/index.html', context)

def galeria(request):
    context={}
    return render(request,'app_levil_barra/galeria.html', context)

def nosotros(request):
    context={}
    return render(request,'app_levil_barra/nosotros.html', context)

def contacto(request):
    context={}
    return render(request,'app_levil_barra/contacto.html', context)

def ubicacion(request):
    context={}
    return render(request,'app_levil_barra/ubicacion.html', context)

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/')
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

@login_required
def productos(request):
    pro = Producto.objects.all()
    context = {'pro': pro, 'obj': request.user}
    return render(request, 'app_levil_barra/productos.html', context)

def agregar(request):
    return render(request, 'app_levil_barra/agregar.html')

def agregarrec(request):
    x = request.POST['nombre']
    y = request.POST['descripcion']
    z = request.POST['precio']
    w = request.FILES.get('imagen')
    c = request.POST['cantidad']
    pro=Producto(nombre=x,descripcion=y,precio=z,imagen=w,cantidad=c)
    pro.save()
    return redirect("/productos")

def eliminar(request, id):
    pro = Producto.objects.get(id=id)
    # Eliminar la foto del producto si existe
    if pro.imagen:
        imagen_path = pro.imagen.path
        if os.path.exists(imagen_path):
            os.remove(imagen_path)
    pro.delete()
    return redirect("/productos")

def actualizar(request,id):
    pro=Producto.objects.get(id=id)
    return render(request,'app_levil_barra/actualizar.html',{'pro':pro})


def actualizarrec(request, id):
    pro = Producto.objects.get(id=id)
    
    if request.method == 'POST':
        x = request.POST['nombre']
        y = request.POST['descripcion']
        z = request.POST['precio']
        w = request.FILES.get('imagen')
        c = request.POST['cantidad']
        pro.nombre = x
        pro.descripcion = y
        pro.precio = z
        if w:
            pro.imagen = w
        pro.cantidad = c
        pro.save()
        return redirect("/productos")
    return render(request, 'app_levil_barra/actualizar.html', {'pro': pro})


def agregar_producto(request):
    if request.method == 'POST':
        form = AgregarProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Producto guardado exitosamente!')
            return redirect('productos') 
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f'{field.capitalize()}: {error}')
    else:
        form = AgregarProductoForm()
    return render(request, 'agregar.html', {'form': form})


def carrito(request):
    context = {}
    return render(request, 'app_levil_barra/carrito.html', context)

def obtener_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    producto_data = {
        'id': producto.id,
        'nombre': producto.nombre,
        'descripcion': producto.descripcion,
        'precio': producto.precio,
        'cantidad': producto.cantidad,
    }
    return JsonResponse(producto_data)
