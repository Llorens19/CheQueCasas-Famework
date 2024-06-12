# CheQueCasas (PHP - Jqwery) 🏠💻

Proyecto realizado en 1º DAW, cuyo fin es tener un primer contacto con la elaboración de Páginas WEB.

## Descripción

**CheQueCasas** es una aplicación web desarrollada en PHP y jQuery que facilita la compra y alquiler de casas. La aplicación está diseñada para ofrecer una experiencia de usuario personalizada y eficiente, permitiendo a los usuarios buscar propiedades, ver detalles, y gestionar sus preferencias de compra o alquiler de manera sencilla.

### Módulos Principales

- **Cart 🛒**: Este módulo permite a los usuarios gestionar una lista de propiedades que les interesan, agregando o eliminando casas según sus preferencias.
- **Home 🏡**: Es el módulo de inicio de la aplicación, donde el usuario realiza su primer filtro de búsqueda según sus preferencias, o bien accede a las viviendas destacadas.
- **Login 🔑**: Módulo de autenticación de usuarios, que incluye el inicio de sesión y el registro de nuevos usuarios para acceder a funcionalidades personalizadas.
- **Maps 🗺️**: Integración con servicios de mapas para mostrar la ubicación de las propiedades, permitiendo a los usuarios visualizar las casas disponibles en un mapa interactivo.
- **Search 🔍**: Funcionalidad avanzada de búsqueda que permite a los usuarios filtrar propiedades según diversos criterios como tipo, operación o ubicación.
- **Shop 🏬**: Este es el módulo principal, cuyo fin es facilitar el proceso de compra y alquiler de propiedades. Dispone de una serie de filtros que nos facilitan encontrar aquello que buscamos.

## Funcionalidades del Módulo "Home" 🏡

### Funcionalidades Principales

1. **Carrusel de Operaciones 🛠️**
   - Muestra las diferentes operaciones disponibles (compra, alquiler, alquiler con opción a compra, etc.).
   - Cada operación se representa con una imagen y un título que facilita la identificación visual.

2. **Carrusel de Tipos de Propiedad 🏠**
   - Presenta los diferentes tipos de propiedades disponibles (casas, apartamentos, oficinas, etc.).
   - Cada tipo de propiedad se muestra con una imagen representativa y una breve descripción.

3. **Carrusel de Ciudades 🌆**
   - Muestra las ciudades donde hay propiedades disponibles.
   - Cada ciudad se presenta con una imagen y el nombre de la ciudad para facilitar la búsqueda geográfica.

4. **Propiedades Más Vistas 👀**
   - Presenta una lista de las propiedades más vistas por los usuarios.
   - Incluye detalles breves como el precio, la ubicación, el número de habitaciones y el tipo de propiedad.

5. **Últimas Propiedades Vistas 🕒**
   - Muestra un carrusel de las últimas propiedades que el usuario ha visitado.
   - Ayuda a los usuarios a retomar rápidamente su búsqueda donde la dejaron.

## Funcionalidades del Módulo "Shop" 🏬

### Funcionalidades Principales

1. **Búsqueda y Filtros 🔍**
   - Permite a los usuarios realizar búsquedas avanzadas utilizando diversos filtros.
   - Los filtros pueden incluir criterios como el tipo de propiedad, operación, ubicación, precio, y más.
   - La búsqueda es manejada principalmente por las funciones de AJAX que se comunican con el backend para obtener los resultados basados en los filtros aplicados.

2. **Paginación y Scroll 📜**
   - Implementa la funcionalidad de paginación para dividir los resultados en páginas manejables.
   - Incluye una función de scroll para cargar más resultados a medida que el usuario va pidiendo más viviendas.

3. **Visualización de Detalles de la Propiedad 🏠**
   - Permite a los usuarios ver detalles completos de cada propiedad.
   - Al hacer clic en una propiedad de la lista, se muestra una vista detallada que incluye información como precio, ubicación, número de habitaciones, baños, garaje, superficie y descripción.

4. **Gestión de Favoritos y Carrito ❤️**
   - Los usuarios pueden agregar propiedades a sus favoritos o a su carrito.
   - Esta funcionalidad permite a los usuarios guardar propiedades de interés para revisarlas más tarde o proceder con la compra/alquiler.

5. **Integración con Mapas 🗺️**
   - Integra servicios de mapas para mostrar la ubicación de las propiedades en un mapa interactivo.
   - Facilita a los usuarios visualizar la localización geográfica de las propiedades.
