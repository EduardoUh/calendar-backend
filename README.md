# **Calendar Backend**

## **Descripción general:**

Backend para un calendario web, que permite la creación de cuentas de usuarios y creación de eventos en el calendario.

## **Funcionalidades incluidas:**

* Crear cuenta.
* Iniciar sesión.
* Crear nuevo evento.
* Consultar los eventos existentes.
* Actualizar eventos existentes (solo el creador del evento).
* Remover eventos existentes (solo el creador del evento).

## **Pasos para correr el servidor**

* Instalar node.js y npm si no los tiene.
* Clonar, hacer fork o descargar el proyecto.
* Abrir una ventana de comandos en la raíz del proyecto.
* Ejecutar el siguiente comando ```npm install```, para installar todas la dependencias necesarias.
* Obtener una cadena de conexión para MongoDB, puedes obtener un cluster gratuito en el siguiente enlace [ir a MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register "MongoDB Atlas").
* Cambiar el nombre del archivo ```.env.template``` a ```.env``` e ingresar los siguientes valores en las variables: PORT=4000 DB_CONNECTION="cadena de conexión obtenida en el paso anterior" JWT_SECRET="Una palabra clave por ejemplo MyPersonalKeyword".
* Ahora en la ventana de comandos abierta ejecuta el siguiente comando ```npm run server```.

**Nota:** Para hacer peticiones a los endpoints puede usar Postman, Thunder client, o usar el frontend que hice para éste backend; [Ir al Calendar Frontend](https://github.com/EduardoUh/calendar-frontend "Calendar Frontend").

## **Description:**

Backend for a web calendar, it allows users and calendar events creation.

## **Features:**

* Create an account.
* Log in.
* Create new calendar event.
* Get the existent events.
* Update existent events (Only the author of the event).
* Remove existent events (Only the author of the event).

## **Steps to get the server running**

* Install node.js and npm if you don't have them.
* Clone, fork or download the project.
* Open a cli in the project root.
* Run the following command to install all necessary dependencies ```npm install```.
* Get a MongoDB connection string, you can get a free cluster in the following link [go to MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register "MongoDb Atlas").
* Rename the ```.env.template``` file to ```.env``` and asign the following values to the variables: PORT=4000 DB_CONNECTION="MongoDb connection string" JWT_SECRET="Any keyword you want e.g. MyPersonalKeyword".
* Now in the cli run the following server ```npm run server```, to get the server running.

**Note:** To start making requests to the endpoints you can use Postman, Thunder client, or use the frontend I made for this backend; [Go to Calendar Frontend](https://github.com/EduardoUh/calendar-frontend "Calendar Frontend").