#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER rocketseat WITH PASSWORD 'ch4ll3nge4d3v0ps' SUPERUSER;
	CREATE DATABASE challenge;
	GRANT ALL PRIVILEGES ON DATABASE challenge TO rocketseat;
EOSQL