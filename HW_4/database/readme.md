Create ```.env``` file
```
POSTGRES_PASSWORD=YOUR_DB_PASSWORD
POSTGRES_DB=YOUR_DB_NAME
```

To build Docker container
```
docker build -t hw4-db-image \
  --build-arg POSTGRES_PASSWORD=YOUR_DB_PASSWORD. \
  --build-arg POSTGRES_DB=YOUR_DB_NAME .
```

To run Docker container
```docker run -d --name hw4-db-container -p 5432:5432 hw4-db-image```
