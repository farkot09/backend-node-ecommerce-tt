# BACKEND_NODE_BOOTCAMP

  

Este proyecto es una API de backend desarrollada en Node.js y Express. Está estructurada siguiendo una arquitectura básica de controladores, modelos y rutas, y puede ser utilizada para gestionar clientes y otros recursos.

  
  

## Requisitos

  

- Node.js (versión 14 o superior)

- npm (versión 6 o superior)


  

## Configuración

  

1. Clona el repositorio en tu máquina local.

  

```bash
git clone https://gitlab.com/farkot09/backend_node_bootscamp_tt.git
cd BACKEND_NODE_BOOTCAMP
 ```

  

## Instala las dependencias:

  

```bash
npm  install
 ```

Crea  un  archivo  .env  en  la  raíz  del  proyecto,  basándote  en  el  archivo  .env_example.  Asegúrate  de  configurar  todas  las  variables  de  entorno  necesarias.  

Configura  la  base  de  datos (si es  aplicable) y aplica las migraciones si estás utilizando una base de datos relacional.

## Variables de entorno

  

Luego de que tengas todas las librerias instaladas (verificado con el package.json) debes configurar las variables de entorno, en el archivo .env_example se muestras las variables necesarias para la ejecucion del programa

  `DB_HOST`: La dirección del servidor MySQL.

`DB_USER`: El nombre de usuario de MySQL.

`DB_PASSWORD`: La contraseña de MySQL.

`DB_NAME`: El nombre de la base de datos de MySQL.

`DB_PORT`: El Puerto para ejecutar el proyecto.

`SECRET_KEY`: Una clave secreta utilizada para codificar un token y validar el formulario de inicio de sesión.


## Ejecucion:

Para  iniciar  el  servidor  en  modo  de  desarrollo,  ejecuta:
```bash
npm  run  dev
```
Para  iniciar  el  servidor  en  modo  de  producción:
```bash
npm  start
```
Endpoints

Aquí  tienes  un  resumen  de  los  endpoints  principales  del  sistema  de  clientes:

  
  |Endopoint                |Accion|Ejemplo|
|----------------|-------------------------------|-----------------------------|
|GET  /customers|`Obtiene  una  lista  de  clientes.`            |GET http://YOUR_SERVER/api/customers            |
|POST  /customers          |`Crea  un  nuevo  cliente.`            |POST http://YOUR_SERVER/api/customers            |
|PUT  /customers/:id          |`Actualiza  la  información  de  un  cliente  existente.`|PUT http://YOUR_SERVER/api/customers/ID_CLIENT|
|DELETE  /customers/:id         |`Elimina  un  cliente."|DELETE http://YOUR_SERVER/api/customers/ID_CLIENT|


>Para  realizar  pruebas  de  los  endpoints,  puedes  usar  los  archivos  .http  en  utils/requests.
>Utilizando la extenxcion REST CLIENT en VS Code

  

## Contirbuir

 - Haz  un  fork  del  proyecto.

- Crea  una  nueva  rama (git checkout  -b  feature/nueva-funcionalidad).

- Realiza  tus  cambios  y  haz  commit (git commit  -am  'Añadir nueva funcionalidad').

- Empuja  tu  rama (git push  origin  feature/nueva-funcionalidad).

- Crea  un  Pull  Request.
## Soporte

Para obtener soporte, puedes enviar un correo electrónico a viagramo2011@gmail.com.

## Authors
- [@GitHub de farkot09](https://github.com/farkot09)
- [@GitLab de farkot09](https://gitlab.com/farkot09)
- [@Linkedin de farkot09](https://www.linkedin.com/in/viktor-grajales-34b990125/) 
