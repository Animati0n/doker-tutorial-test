
# doker-tutorial-test

## Getting Started Todo App

This project provides a sample todo list application. It demonstrates all of
the current Docker best practices, ranging from the Compose file, to the
Dockerfile, to CI (using GitHub Actions), and running tests. It's intended to 
be a well-documented to ensure anyone can come in and easily learn.

### Application architecture

![image](https://github.com/Animati0n/doker-tutorial-test/blob/main/assets/mychange.jpg)

This sample application is a simple React frontend that receives data from a
Node.js backend. 

When the application is packaged and shipped, the frontend is compiled into
static HTML, CSS, and JS and then bundled with the backend where it is then
served as static assets. So no... there is no server-side rendering going on
with this sample app.

During development, since the backend and frontend need different dev tools, 
they are split into two separate services. This allows [Vite](https://vitejs.dev/) 
to manage the React app while [nodemon](https://nodemon.io/) works with the 
backend. With containers, it's easy to separate the development needs!

### Development
<!-- old project repo https://github.com/docker/getting-started-todo-app -->
To spin up the project, simply install Docker Desktop and then run the following 
commands:

```
git clone https://github.com/Animati0n/doker-tutorial-test.git
cd doker-tutorial-test
docker compose up -d
```

You'll see several container images get downloaded from Docker Hub and, after a
moment, the application will be up and running! No need to install or configure
anything on your machine!

Simply open to [http://localhost](http://localhost) to see the app up and running!

Any changes made to either the backend or frontend should be seen immediately
without needing to rebuild or restart the containers.

To help with the database, the development stack also includes Mongo-Express, which
can be access at [http://mongo.localhost](http://mongo.localhost) (most browsers will 
resolve `*.localhost` correctly, so no hosts file changes should be required).

#### Tearing it down

When you're done, simply remove the containers by running the following command:

```
docker compose down
```
