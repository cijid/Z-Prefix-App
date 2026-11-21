# Welcome to my CRUD App

This is an inventory management application.

## Features

### Inventory Managers

1. Create accounts.
2. Log into accounts.

- Defaults to YOUR item list!

3. Track your personal inventory of items.
4. Create new items
5. Filter by items created by inventory managers

- Defaults to YOU!

6. Descriptions of items that exceed 100 characters will be displayed with "...". Full description can be found after selecting an item
7. Select an individual item to view details!

- From the item detail view, inventory managers can edit or delete the items that THEY created!

### Visitors

1. Visitors can view all items and they can view specific item details!
2. Visitors cannot create, edit, or delete existing items.

## Launching the application

### Docker Compose

There are two methods to start the application.

`docker compose -f docker-compose.yaml up --build`
This will start up the frontend, backend, and database without any seeded data.

`docker compose -f docker-compose-seed.yaml up --build`
This will start up the frontend, backend, and database using seeded data. The intention of this version of the compose file is to allow users to navigate and gain experience with the features of the application. It is not intended for a production environment.

If you choose to switch between the different compose files, be sure to delete the volume `crud-application_crud_postgres_data` from Docker Desktop before trying to `docker compose up`.

## Interacting with the application

### Creating an Account

1. Click the `Create Account or Login` in the top right corner of the Crud App
2. Create Account should be the default option selected. You will know if you are in the right place if the text Create Account appears on screen.

- Enter your First Name
- Enter your Last Name
- Enter your Username
- Enter your Password

3. Click Submit
4. After clicking submit, you will be returned to the main screen of the application.

- Confirm you are logged in by finding your name in red at the top right of the screen.

### Log into your Account

### View the Inventory

### View Item Details

### Add an Item

### Edit an Item

### Delete an Item
