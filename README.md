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

## Funcionalidades del Módulo "Shop"

### Funcionalidades Principales

1. **Búsqueda y Filtros**
   El módulo "Shop" permite a los usuarios realizar búsquedas avanzadas utilizando diversos filtros. Los filtros pueden incluir criterios como el tipo de propiedad, operación, ubicación, precio, y más. La búsqueda es manejada principalmente por las funciones de AJAX que se comunican con el backend para obtener los resultados basados en los filtros aplicados.

2. **Paginación y Scroll **
   El módulo implementa la funcionalidad de paginación para dividir los resultados en páginas manejables. También incluye una función de scroll para cargar más resultados a medida que el usuario va pidiendo más viviendas.

3. **Visualización de Detalles de la Propiedad**
   Los usuarios pueden ver detalles de cada vivienda. Al hacer clic en una propiedad de la lista, se muestra una vista detallada que incluye información como precio, ubicación, número de habitaciones, baños, garaje, superficie y descripción.

4. **Gestión de Favoritos y Carrito**
   Los usuarios pueden agregar propiedades a sus favoritos o a su carrito. Esta funcionalidad permite a los usuarios guardar propiedades de interés para revisarlas más tarde o proceder con la comprao el alquiler.

5. **Integración con Mapas**
   El módulo integra servicios de mapas para mostrar la ubicación de las propiedades en un mapa interactivo. Esto facilita a los usuarios visualizar la localización de las propiedades.

