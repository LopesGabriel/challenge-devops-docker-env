# Notes API

App to save notes

## Configuration

### Docker image build

Build the image with

```sh
docker build -t {image_name}:{image_tag} .
```

### Run the app

You need a Postgres database and also to provide the environment variable
`DATABASE_URL` with postgresql connection string.

Follow an example of how to run the docker container, please remember to replace
the variables beteween "{}" with correct values

```sh
docker run -p 3000:3000 -e DATABASE_URL=postgresql://{username}:{password}@{db-container}:5432/{db-name}?schema=public --network {db-network} {image}:{tag}
```

### Database user configuration

Note that I made available a script to generate the user and database, all you
have to do is update the file at `pg/init-user-db.sh` with desired configuration

### Test drive

It's possible to build the image, start the app container and a database container
by running the compose file with `docker compose up --build`, optionally you
can add `-d` arg to run it in detached mode