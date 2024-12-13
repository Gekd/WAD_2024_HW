To run Node.js server and PostgreSQL database inside Docker containers with Docker Compose:

Add ```.env``` file into the main folder:
```
POSTGRES_USER=YOUR_USERNAME
POSTGRES_PASSWORD=YOUR_PASSWORD
POSTGRES_DB=YOUR_DB_NAME
```


```shell
# Start the process
docker-compose up --build

# To close the process
# Press CNTR/CMD + C

# Remove volumes and orphans
docker-compose down --volumes --remove-orphans

```

[API endpoints](back-end/readme.md)
