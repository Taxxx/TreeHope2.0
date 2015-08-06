TreeHope2.0
============

[Descripción:] Es una aplicación web multiplataforma, la cual administra notificaciones de usuarios sobre actos de deforestación y al mismo tiempo gestiona datos de sensores de temperatura y humedad que monitorean variaciones de temperatura en Áreas Naturales protegidas. 
Más información: Permite al usuario reportar actos o desastres de deforestación, con la posibilidad del envío de imágenes y/o video, publicando los mismos en el portal de la aplicación, donde se visualizaran los reportes de usuarios, pudiendo puntuar cada uno de ellos, validando o desacreditando las publicaciones.
Con los datos recibidos de los sensores, se puede determinar posibles desastres naturales, alertando posibles incendios, sequias o inundaciones y dando su ubicación. Éstos estarán conectados por radiofrecuencia, a distancia, y al mismo tiempo con sensores de tierra conectados por cable controlando la humedad del área dando a conocer el estado del terreno. 
Para ubicar el lugar aproximado del reporte o notificación, la aplicación usa permisos de autenticación y geolocalización del usuario, mediante redes sociales.

Install

	npm install 

Run server

	1) node server (Corre de forma normal)
	2) supervisor server (corriendo con supervisor no es nesecario reiniciar el server por update)
	3) supervisor --debug server (para debuggear con node inspector)

### Interesting links

[Backbone](backbonejs.org)

[Tutorial de backbone](https://github.com/addyosmani/backbone-fundamentals/blob/gh-pages/backbone-fundamentals.md)

[Grunt.js](http://gruntjs.com/getting-started)
