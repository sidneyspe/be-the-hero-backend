# Be The Hero Backend

This project aims the Be The Hero Application to register incidents of ONGs

## Setup

You will need to install:
* nodejs
* npm
* Yarn
* [Docker](https://www.docker.com/)
* [Postbird](https://www.electronjs.org/apps/postbird)
* [Insomnia](https://insomnia.rest/download/)

### Docker

Please install docker and after run the following command:

`docker run -d -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=postgres postgres `

This command will create a docker container with postgres installed.
The `user` and the `password` of this container is: `postgres`

&nbsp;

After run the following command:

`docker update --restart=always postgres`

This command will restart the container named postgres always the docker is started.

&nbsp;

### Database
Using the Postbird or other similar app, access the postgres and create a database named:

`be-the-hero`

&nbsp;

### Project

Please access the `be-the-hero-backend` folder and run the following command: `yarn`

Run the sequelize migrations to create the tables that will need: `yarn migration`

&nbsp;


### Running the Backend Application

Please enter the command:

`yarn dev`

&nbsp;
