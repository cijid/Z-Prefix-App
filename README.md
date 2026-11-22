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

1. Click the `Create Account or Login` in the top right corner of the Crud App
2. Create Account should be the default option selected. Click Login to switch to the login screen. You will know if you are in the right place if the text Login appears on screen.

- Enter your Username
- Enter your Password

3. Click Submit
4. After clicking submit, you will be returned to the main screen of the application.

- Confirm you are logged in by finding your name in red at the top right of the screen.

### View the Inventory

All users and visitors can view the entire inventory from the main screen of the application.

1. The `Select User:` dropdown can filter by either all inventory managers or specified user.

### View Item Details

All users and visitors can view an items details by left clicking an item in the inventory.

Item Details provides:
Item ID
User ID (ID of inventory manager who created Item)
Item Name
Item Description (Full description)
Quantity

### Add an Item

Items can only be added by logged in inventory managers. Added items are visible from the `All Users` option and under the inventory of the user who created it.

Add an Item By

1. If not already, log into the application.
2. In the top-right corner of the screen is the `Add Item` button with orange border. Click that button to navigate to the Add Item screen.
3. The following information will be required

- Item Name
- Description
- Quantity

4. Click Submit to add the item to the inventory and be automatically redirected to your inventory.

### Edit an Item

Items can only be edited by the inventory manager that originally created the item.

Edit an Item by

1. If not already, log into the application.
2. Select an item you created from either the main inventory or your personal inventory. You should see two options:

- Edit or Delete Item
- Close

3. Click Edit or Delte Item

- Update the item details
- Click `Save Changes` button.

### Delete an Item

Items can only be deleted by the inventory manager that originally created the item.

Delete an Item by

1. If not already, log into the application.
2. Select an item you created from either the main inventory or your personal inventory. You should see two options:

- Edit or Delete Item
- Close

3. Click Edit or Delte Item

- Click the `Delete` button.

4. The item will be removed.
