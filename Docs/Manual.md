# Technical manual

## Content

- [Objectives](#objectives)
- [Architecture](#architecture)
- [IAM users](#iam)

## Objectives<a name="objectives"></a>

El motivo fundamental de este documento es brindar el conocimiento de la arquitectura y el análisis de las funcionalidades del sistema, también un análisis de las herramientas y servicios utilizados.

## Architecture<a name="architecture"></a>

El estilo arquitectónico para este proyecto es basado en capas el cual nos permite aislar cada una de ellas permitiéndonos aumentar en su escalabilidad horizontal y logrando así una mejor integridad y seguridad en los datos del usuario final.

Poseyendo la siguiente estructura:

- Tres instancias de EC2:

  - Instancian con una imagen de Nginx que posee el compilado del Frontend realizado en Angular exponiendo el puerto 80.
  - Instancia con una imagen de Nodejs el cual levanta el Backend con el puerto 3000 expuesto.
  - Instancia con una imagen de MySQL la cual posee un usuario para su ingreso y el puerto 3306 expuesto.

- Amazon Cognito: Servicio el se utiliza para realizar la autenticación de los usuarios almacenando su información más importante.

- Amazon Rekognition: Servicio el cual se utiliza para obtener la identificación de las imágenes siendo utilizada para la obtención de sus etiquetas y la comparación en el inicio de sesión.

- Amazon API Gateway: Servicio el cual permite el consumo de las funciones lambda implementadas.

- Función de Lambda: Función que permite la comunicación con un servicio de Amazon mencionado anteriormente.

- Amazon S3 Bucket: Servicio para el almacenamiento de los archivos distribuyendo cada uno por carpeta.

<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1634694445/USocial/uwsknwjleszdcrptfias.png" width="400">
    <p align="center">Architecture</p>
</div>
<div align="center">
    <img src="https://res.cloudinary.com/dzchmybac/image/upload/v1634694535/USocial/uwnb2zofw7ztwnqp2lpo.png" width="400">
    <p align="center">ER</p>
</div>

## IAM users<a name="iam"></a>

En los usuarios IAM fue necesario crear tres de tal manera que cada uno solo pudiera acceder a los servicios necesarios mediante su rol:

- El primer usuario que se creo fue un usuario administrador con el identificador `Administrador_201801266`el cual posee los permisos `AdministratorAccess` permitiéndole así administrar cada una de las capas y funcionalidades del proyecto.

- El segundo usuario se creó para poder acceder mediante el SDK de AWS permitiendo poder realizar el trabajo de desarrollo de las funcionalidades del proyecto relacionadas al servicio de Bucket S3. Los roles que se le asignaron fueron `AmazonS3FullAccess`.

- El tercer usuario se creó para poder acceder mediante el SDK de AWS permitiendo poder realizar el trabajo de desarrollo de las funcionalidades del proyecto relacionadas al servicio de Rekognition. Los roles que se le asignaron fueron `AmazonRekognitionFullAccess`.
