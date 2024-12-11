Add ```.env``` file to the root folder

To start the application

1) ```npm install```
2) ```nodemon server.js```

API endpoints

| **HTTP Verbs** |         **Endpoints**         |              **Actions**             |                                **Notes**                               |
|:--------------:|:-----------------------------:|:------------------------------------:|:----------------------------------------------------------------------:|
|    ```GET```   |     ```:3000/api/posts/```    |             Get all posts            |                                    -                                   |
|    ```GET```   |   ```:3000/api/posts/:id```   |         Get single post by ID        |            Post ID appends to url(for example "...posts/1")            |
|   ```POST```   |     ```:3000/api/posts/```    |             Add new post             | JSON body: { "title":POST_TITLE, "body":POST_BODY, "urllink":IMG_URL } |
|    ```PUT```   |   ```:3000/api/posts/:id```   | Change single post parameters by ID  |            Post ID appends to url(for example "...posts/1")            |
|    ```DEL```   |   ```:3000/api/posts/:id```   |       Delete single post by ID       |            Post ID appends to url(for example "...posts/1")            |
|   ```POST```   |    ```:3000/auth/signup```    |             Add new user             |      JSON body: { "email":USER_EMAIL, "password": USER_PASSWORD }      |
|   ```POST```   |     ```:3000/auth/login```    |              Log in user             |      JSON body: { "email":USER_EMAIL, "password": USER_PASSWORD }      |
|    ```GET```   | ```:3000/auth/authenticate``` |           Authenticate user          |                        Add token to JWT headers                        |
|    ```GET```   |    ```:3000/auth/logout```    |             Log user out             |                        Add token to JWT headers                        |