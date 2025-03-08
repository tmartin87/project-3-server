# 📍Nexo 

**Nexo** es una SPA diseñada para ayudarte a crear, organizar y compartir planes con tus amigos. Ya sea que estés planeando una reunión, una actividad o cualquier otro tipo de evento, Nexo te permite crear planes personalizados, invitando a amigos a unirse. Además, puedes elegir si tu plan será público o privado para compartirlo con más personas o mantenerlo exclusivo.

## 📄 Descripción

Esta es una aplicación full stack que cumple con los requisitos técnicos especificados. La aplicación consta de un **frontend** desarrollado con **React** (Single Page Application - SPA) y un **backend** construido con **Express.js**, **MongoDB** y **Mongoose**. La aplicación implementa todas las operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) para tres modelos de base de datos: Usuarios, Planes y Comentarios. Además, la aplicación incluye funcionalidades de autenticación (registro, inicio de sesión y cierre de sesión) con contraseñas encriptadas y autorización para usuarios registrados.

La aplicación está diseñada con un enfoque **mobile-first**, asegurando que sea completamente responsive y optimizada para dispositivos móviles. También se ha implementado validación en el backend y manejo centralizado de errores, proporcionando retroalimentación clara al usuario en caso de errores.

## 📱 Funcionalidades

1. **Crear plan**:
   - Agrega título, descripción, fecha y hora.
   - Define la privacidad del plan (público o privado).
   - Envía invitaciones a tus amigos por WhatsApp o enlace.

2. **Unirse a planes**:
   - Explora planes públicos creados por otros usuarios.
   - Únete a planes que se adapten a tus intereses.

3. **Gestionar planes**:
   - Edita o elimina tus planes.
   - Visualiza el estado de los planes y la lista de personas unidas.
   - Comenta en los planes para interactuar con otros usuarios y compartir ideas.

4. **Comentar en planes**:
   - Deja comentarios en los planes para compartir opiniones, sugerencias o preguntas.
   - Interactúa con otros usuarios a través de los comentarios.
  
   
## ⚙️ Instalación & Configuración

### Backend
1. **Clonar el repositorio del backend**
 ```bash
  git clone https://github.com/tmartin87/project-3-server.git
cd project-3-server
   ```
2. **Instalar dependencias:**
 ```bash
  git clone https://github.com/tmartin87/project-3-server.git
cd project-3-server
   ```
3. **Configurar variables de entorno:**
Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:
 ```bash
 PORT=5000
MONGO_URI=mongodb://localhost:27017/project3
JWT_SECRET=your_jwt_secret
   ```
4. **Ejecutar el servidor:**
 ```bash
npm startﬁ
   ```
El backend estará disponible en http://localhost:5000.


## 🗂️ Modelos (Colecciones)

La base de datos de Nexo está estructurada en las siguientes colecciones:

- **👤 Usuarios**: Almacena información de los usuarios registrados, como nombre, correo electrónico y contraseña hasheada.
- **🗓️ Planes**: Contiene los detalles de cada plan creado, incluyendo título, descripción, fecha, hora, privacidad (público o privado) y la lista de participantes.
- **💬 Comentarios**: Permite a los usuarios dejar comentarios en los planes para interactuar y coordinar mejor los eventos.

## 🛠️ Tecnologías Usadas

### Backend
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para construir aplicaciones web y APIs.
- **MongoDB**: Base de datos NoSQL para almacenar datos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB.
- **JWT**: Autenticación basada en tokens.

### Herramientas Adicionales
- **Git**: Control de versiones.
- **GitHub**: Plataforma para alojar y gestionar el código.
- **Postman**: Pruebas de la API durante el desarrollo.
- **Visual Studio Code**: Editor de código utilizado para el desarrollo.


## ⏳ Backlog

### Implementado
- [x] Configuración inicial del backend con Node.js y Express.
- [x] Conexión a la base de datos MongoDB.
- [x] Desarrollo de la API RESTful para manejar usuarios, productos y pedidos.
- [x] Configuración inicial del frontend con React.
- [x] Integración del frontend con el backend mediante Axios.
- [x] Implementación de la autenticación con JWT.
- [x] Validación en el backend y manejo centralizado de errores.
- [x] Despliegue de la aplicación.
- [x] Diseño mobile-first y aplicación responsive.

### Pendiente
- [ ] Pruebas end-to-end (e2e) con Cypress.
- [ ] Mejoras en la interfaz de usuario.
- [ ] Añadir más funcionalidades fuera del MVP (por ejemplo, búsqueda avanzada, filtros, etc.).
- [ ] Optimización del rendimiento del backend.
- [ ] Implementación de un sistema de notificaciones en tiempo real.

## 🔗 Enlace a repositorio de Frontend
https://github.com/martxgomez/project-3-client

## 📩 Contact

### José Inacio
- 📧 Email: inaciojosea13@gmail.com  
- 🐱 GitHub: martxgomez
- 🔗 LinkedIn: https://www.linkedin.com/in/josé-antonio-inácio-romero-5b04a0179/

### Marta Gómez
- 📧 Email: martagomez.code@gmail.com  
- 🐱 GitHub: martxgomez
- 🔗 LinkedIn: https://www.linkedin.com/in/martagomezmartinez/

### Roxana Ferramola
- 📧 Email: ferramolafvm@gmail.com
- 🐱 GitHub: rferramola
- 🔗 LinkedIn: https://www.linkedin.com/in/rferramola/
  
### Tomás Martín
- 📧 Email: tmartindsgn@gmail.com
- 🐱 GitHub: tmartin87
- 🔗 LinkedIn: https://www.linkedin.com/in/tomas-martin-46496282
