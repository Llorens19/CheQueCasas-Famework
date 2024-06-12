# CheQueCasas (PHP - jQuery) 🏠💻

Proyecto realizado en 1º DAW, cuyo fin es tener un primer contacto con la elaboración de aplicaciones WEB.

## Descripción

**CheQueCasas** es una aplicación web desarrollada en PHP y jQuery que facilita la compra y alquiler de casas. La aplicación está diseñada para ofrecer una experiencia de usuario personalizada y eficiente, permitiendo a los usuarios buscar propiedades, ver detalles, y gestionar sus preferencias de compra o alquiler de manera sencilla.


### Módulos Principales

- **Home 🏡**: Es el módulo de inicio de la aplicación, donde el usuario realiza su primer filtro de búsqueda según sus preferencias, o bien accede a las viviendas destacadas.
- **Shop 🏬**: Este es el módulo principal, cuyo fin es facilitar el proceso de compra y alquiler de propiedades. Dispone de una serie de filtros que nos facilitan encontrar aquello que buscamos.
- **Search 🔍**: Funcionalidad avanzada de búsqueda que permite a los usuarios filtrar propiedades según diversos criterios como tipo, operación o ubicación.
- **Maps 🗺️**: Integración con servicios de mapas para mostrar la ubicación de las propiedades, permitiendo a los usuarios visualizar las casas disponibles en un mapa interactivo.
- **Login 🔑**: Módulo de autenticación de usuarios, que incluye el inicio de sesión y el registro de nuevos usuarios para acceder a funcionalidades personalizadas.
- **Cart 🛒**: Este módulo permite a los usuarios gestionar una lista de propiedades que les interesan, agregando o eliminando casas según sus preferencias.

### Tecnologías Utilizadas

#### Backend

![Backend](https://skillicons.dev/icons?i=mysql,php,jwt)

- **MySQL**: Sistema de gestión de bases de datos relacional.
- **PHP**: Lenguaje de programación del lado del servidor.
- **JWT**: Estándar abierto para la creación de tokens de acceso seguros.

#### Frontend

![Frontend](https://skillicons.dev/icons?i=jquery,html,css)

- **jQuery**: Biblioteca de JavaScript para simplificar la manipulación del DOM.
- **HTML**: Lenguaje de marcado para estructurar las páginas web.
- **CSS**: Lenguaje de estilo para diseñar las páginas web.

  
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

## Funcionalidades del Módulo "Search" 🔍

### Funcionalidades Principales

1. **Carga de Tipos de Propiedad 🏠**
   - Permite cargar y mostrar los diferentes tipos de propiedades disponibles.

2. **Carga de Operaciones 🛠️**
   - Permite cargar y mostrar las diferentes operaciones disponibles (compra, alquiler, etc.).

3. **Autocompletado de Búsqueda 📝**
   - Proporciona una funcionalidad de autocompletado para la búsqueda de ciudades.

4. **Botón de Búsqueda 🚀**
   - Inicia la búsqueda basada en los filtros seleccionados por el usuario.

## Funcionalidades del Módulo "Login" 🔑

### Funcionalidades Principales

1. **Inicio de Sesión 🔑**
   - Permite a los usuarios autenticarse ingresando su nombre de usuario y contraseña.

2. **Registro de Usuarios 📝**
   - Facilita la creación de nuevas cuentas de usuario.

3. **Recuperación de Contraseña 🔄**
   - Permite a los usuarios recuperar sus contraseñas en caso de olvido.

4. **Social Login🌐**
   - Soporta el inicio de sesión utilizando cuentas de Google y GitHub.

5. **Cambio de Foto de Perfil 📸**
   - Permite a los usuarios subir y cambiar su foto de perfil.

6. **Ver y Gestionar Favoritos ❤️**
   - Los usuarios pueden ver y gestionar las viviendas que han marcado como favoritas.

7. **Modificar Datos Personales 📝**
   - Permite a los usuarios actualizar su información personal, incluyendo nombre, apellidos y teléfono.

8. **Activar Verificación en Dos Pasos (2FA) 🔐**
   - Existe la opción de configurar y activar la verificación en dos pasos para mejorar la seguridad de su cuenta.

## Funcionalidades del Módulo "Maps" 🗺️

### Funcionalidades Principales

1. **Visualización de Propiedades en el Mapa 🏠**
   - Muestra todas las propiedades disponibles en un mapa interactivo utilizando Mapbox.
   - Cada propiedad se representa con un marcador que incluye una ventana emergente con detalles de la propiedad.

2. **Detalles de la Propiedad en el Mapa 📋**
   - Al hacer clic en un marcador, se muestra una ventana emergente con detalles como precio, ubicación, número de habitaciones, baños, tipo de propiedad y tamaño.
   - Las ventanas emergentes también incluyen un carrusel de imágenes de la propiedad.

3. **Funcionalidad de Dibujo en el Mapa ✏️**
   - Permite a los usuarios dibujar polígonos en el mapa para seleccionar áreas específicas.
   - Los polígonos dibujados se pueden utilizar para filtrar propiedades que se encuentran dentro del área seleccionada.

4. **Puntos en el Mapa 🔍**
   - Permite a los usuarios ver los puntos de las propiedades en el mapa.
   - Proporciona información detallada sobre cada propiedad cuando se hace clic en los puntos del mapa.

## Funcionalidades del Módulo "Cart" 🛒

### Funcionalidades Principales

1. **Cargar Carrito 🛒**
   - Carga los artículos del carrito de compras del usuario.
   - Muestra cada artículo en una lista con su imagen, nombre, descripción, cantidad, precio y opciones para incrementar, decrementar o eliminar el artículo.

2. **Incrementar Cantidad ➕**
   - Permite a los usuarios incrementar la cantidad de un artículo en el carrito.
   - Actualiza la cantidad en el servidor y recalcula el total del carrito.

3. **Decrementar Cantidad ➖**
   - Permite a los usuarios decrementar la cantidad de un artículo en el carrito.
   - Actualiza la cantidad en el servidor y recalcula el total del carrito.

4. **Eliminar Artículo 🗑️**
   - Permite a los usuarios eliminar un artículo del carrito.
   - Actualiza el carrito en el servidor y recalcula el total del carrito.

5. **Seleccionar Artículos ✅**
   - Permite a los usuarios seleccionar o deseleccionar artículos en el carrito.
   - Actualiza el estado de selección en el servidor y recalcula el total del carrito.

6. **Calcular Total 💰**
   - Calcula y muestra el total del carrito en función de los artículos seleccionados.

7. **Realizar Compra 🛍️**
   - Permite a los usuarios realizar la compra de los artículos en el carrito.
   - Valida los datos de compra, envía la solicitud al servidor y muestra una notificación de éxito.

8. **Ver Facturas y QR 📄📱**
   - Permite a los usuarios ver las facturas y códigos QR de sus compras anteriores.
