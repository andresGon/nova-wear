# Nova Wear - Aplicación Web de Tienda de Ropa

Nova Wear es una aplicación web desarrollada con Angular que simula una tienda online. Cuenta con componentes modulares, integración de servicios para consumo de APIs, y un enfoque escalable para proyectos front-end.

se utilizo una api publica llama **Fake Store API** 
https://fakestoreapi.com/

## 🚀 Características principales

se listan todos los productos de la api publica, se visualizan en cards individuales, al hacer click en la card se abre un modal con mas detalles del producto.
se puede filtrar los productos por categoria desde el componente header.

## 📄 Tecnologías utilizadas

* **Angular 17**
* **TypeScript**
* **SCSS**
* **HttpClientModule** (para peticiones HTTP)
* **Testing**: Karma + Jasmine + HttpClientTestingModule
* **Compodoc** (documentación)
---

## 📁 Estructura del proyecto

```bash
src/app/
├── components/
│   ├── header/         # Componente de navegación superior
│   ├── footer/         # Componente de pie de página
│   ├── home/           # Vista principal o de inicio
│   ├── product-list/   # Listado de productos
│   └── product-modal/  # Modal para detalles de producto
├── models/
│   └── product.model.ts  # Interfaces y modelos de datos
├── services/
│   ├── api.service.ts     # Servicio para consumo de APIs
│   └── api.service.spec.ts  # Pruebas unitarias del servicio
├── app.component.*       # Componente principal
├── app.module.ts         # Módulo principal de la app
├── app.config.ts         # Configuraciones generales
└── app.routes.ts         # Rutas de navegación
```

---

## 📊 Diagrama simple de componentes

```text
AppComponent
├── HeaderComponent
├── RouterOutlet
│   ├── HomeComponent
│   │   └── ProductListComponent
│   │       └── ProductModalComponent
└── FooterComponent
```

---

## 🧬 Decisiones técnicas clave

* **Componentes standalone**: Se utilizaron componentes standalone para mejorar la modularidad y evitar sobrecarga en `app.module.ts`.
* **HttpClientTestingModule**: Usado para pruebas unitarias sin depender de una API real.
* **Product model**: Centralización de interfaces para consistencia tipada.
* **Separation of concerns**: Servicios, modelos, y componentes bien delimitados.
* **Documentacion**: Se utilizó `compodoc` para generar documentación automática.
---

## ✅ Posibles mejoras futuras

* 📈 **Integración con Backend real**: Actualmente los datos son simulados; se podría conectar con una API real o Firebase.
* 🚀 **Carrito de compras**: Implementar lógica y visualización del carrito.
* ⏳ **Estado global**: Usar `NgRx` o `SignalStore` para manejar estado compartido.
* 📖 **Lazy loading** de módulos para mejorar rendimiento.
* 🛍️ **Filtros y categorías**: Mejora UX del listado de productos.
* 🔍 **Buscador** de productos.

---

## ▶️ Ejecución del proyecto

```bash
npm install
ng serve
```

Abre en navegador: [http://localhost:4200]

---

## ✏️ Autor

Desarrollado por **Andres Mauricio Gonzalez** como parte de un una prueba para la vacante de desarrollador front end.
email: miroenlared@gmail.com
tel: 301 384 05 56
---