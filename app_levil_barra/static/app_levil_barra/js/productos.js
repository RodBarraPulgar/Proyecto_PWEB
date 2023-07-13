// Obtener los elementos del DOM
const botonesMenos = document.querySelectorAll('.boton-menos');
const botonesMas = document.querySelectorAll('.boton-mas');
const cantidades = document.querySelectorAll('.cantidad-input');
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
const carritoLista = document.querySelector('#carrito-lista');
const carritoTotal = document.querySelector('#carrito-total');
const botonVaciarCarrito = document.querySelector('#vaciar-carrito');

let carrito = [];

// Agregar evento click a los botones de restar cantidad
botonesMenos.forEach((botonMenos, index) => {
  botonMenos.addEventListener('click', () => {
    let cantidad = parseInt(cantidades[index].value);
    if (cantidad > 1) {
      cantidad--;
      cantidades[index].value = cantidad;
    }
  });
});

// Agregar evento click a los botones de sumar cantidad
botonesMas.forEach((botonMas, index) => {
  botonMas.addEventListener('click', () => {
    const cantidadMaxima = parseInt(botonMas.getAttribute('data-max-cantidad'));
    let cantidad = parseInt(cantidades[index].value);

    if (cantidad < cantidadMaxima) {
      cantidad++;
      cantidades[index].value = cantidad;
    }
  });
});

// Event listener para los botones "Agregar al carrito"
botonesAgregarCarrito.forEach((botonAgregarCarrito) => {
  botonAgregarCarrito.addEventListener('click', (event) => {
    const productoId = event.target.getAttribute('data-producto-id');
    const cantidadInput = event.target.parentElement.querySelector('.cantidad-input');
    const cantidad = parseInt(cantidadInput.value);
    obtenerProducto(productoId)
      .then((producto) => {
        if (cantidad <= producto.cantidad) { // Verificar si la cantidad no supera el stock disponible
          agregarProductoAlCarrito(producto, cantidad);
          mostrarCarrito();
        } else {
          alert('La cantidad seleccionada supera el stock disponible.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener el producto:', error);
      });
  });
});

// Función para obtener el producto seleccionado
function obtenerProducto(id) {
  return new Promise((resolve, reject) => {
    const url = `/productos/${id}/`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(producto, cantidad) {
  const itemCarrito = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: cantidad,
    maxCantidad: producto.cantidad
  };

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((item) => item.id === producto.id);

  if (productoExistente) {
    // Si el producto ya está en el carrito, sumar la cantidad
    const cantidadTotal = productoExistente.cantidad + cantidad;

    if (cantidadTotal <= producto.cantidad) {
      // Si la cantidad total no supera el stock disponible, actualizar la cantidad
      productoExistente.cantidad = cantidadTotal;
    } else {
      alert('La cantidad seleccionada supera el stock disponible.');
    }
  } else {
    // Si el producto no está en el carrito, agregarlo
    carrito.push(itemCarrito);
  }
}

// Función para mostrar el carrito en el HTML
function mostrarCarrito() {
  carritoLista.innerHTML = '';

  carrito.forEach((item) => {
    const { nombre, precio, cantidad } = item;

    const li = document.createElement('li');
    li.innerHTML = `
      ${nombre} - $${precio} CLP - Cantidad: ${cantidad}
    `;
    carritoLista.appendChild(li);
  });

  calcularTotalCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProductoCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  mostrarCarrito();
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
  let total = 0;

  carrito.forEach((item) => {
    total += item.precio * item.cantidad;
  });

  carritoTotal.textContent = `${total.toLocaleString()} CLP`;
  carritoTotal.innerHTML = carritoTotal.innerHTML.replace(/ CLP/g, '');
}

// Event listener para el botón "Vaciar carrito"
botonVaciarCarrito.addEventListener('click', () => {
  carrito = [];
  mostrarCarrito();
});

document.addEventListener('DOMContentLoaded', () => {
  const cuadroBlanco = document.querySelector('#cuadro-blanco');

  document.querySelectorAll('.producto-imagen').forEach((imagen) => {
    imagen.addEventListener('click', () => {
      const nombre = imagen.getAttribute('data-nombre');
      const imagenSrc = imagen.getAttribute('data-imagen');
      const descripcion = imagen.getAttribute('data-descripcion');
      const cantidad = imagen.getAttribute('data-cantidad');
      const precio = imagen.getAttribute('data-precio');

      document.querySelector('#titulo').textContent = nombre;
      document.querySelector('#imagen').src = imagenSrc;
      document.querySelector('#descripcion').textContent = descripcion;
      document.querySelector('#cantidad').textContent = `Cantidad actual: ${cantidad}`;
      document.querySelector('#precio').textContent = `$ ${precio} CLP`;

      cuadroBlanco.classList.add('mostrar');
    });
  });

  cuadroBlanco.addEventListener('click', (event) => {
    if (event.target === cuadroBlanco || event.target.id === 'cerrar-cuadro') {
      cuadroBlanco.classList.remove('mostrar');
    }
  });
});

