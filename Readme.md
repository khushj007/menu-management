## Overview

This project is a Node.js backend server for menu management. The menu is divided into three parts in the following order:

1. **Category**
2. **Subcategory**: A category can have multiple subcategories.
3. **Items**: A subcategory can have multiple items in it.

The project uses PostgreSQL for the database, Prisma for ORM, TypeScript for the language, and Node.js.

## Category API

### Get a Specific Category

- **Endpoint:** `GET https://menu-management-2csr.onrender.com/category/:idOrName`
- **Description:** Retrieve a specific category by its ID or name.

### Get All Categories

- **Endpoint:** `GET https://menu-management-2csr.onrender.com/category/all`
- **Description:** Retrieve all categories.

### Update a Category

- **Endpoint:** `PUT https://menu-management-2csr.onrender.com/category/update`
- **Description:** Update an existing category.
- **Input:**

  ```json
  {
    "old_name": "string",
    "name": "string",
    "image": "string",
    "description": "string",
    "taxApplicable": "boolean",
    "tax": "number",
    "taxType": "string"
  }
  ```

### Create a Category

- **Endpoint:** `POST https://menu-management-2csr.onrender.com/category/create`
- **Description:** Create a category.
- **Input:**

  ```json
  {
    "old_name": "string",
    "name": "string",
    "image": "string",
    "description": "string",
    "taxApplicable": "boolean",
    "tax": "number",
    "taxType": "string"
  }
  ```

### Delete a Category

- **Endpoint:** `DELETE https://menu-management-2csr.onrender.com/category/delete`
- **Description:** Delete a category.

## SubCategory API

### Get a Specific SubCategory

- **Endpoint:** `GET https://menu-management-2csr.onrender.com/subcategory/:idOrName`
- **Description:** Retrieve a specific category by its ID or name.

### Get All SubCategories

- **Endpoint:** `GET https://menu-management-2csr.onrender.com/subcategory/all`
- **Description:** Retrieve all categories.

### Update a SubCategory

- **Endpoint:** `PUT https://menu-management-2csr.onrender.com/subcategory/update`
- **Description:** Update an existing category.
- **Input:**

  ```json
  {
    "id": "number",
    "old_name": "string",
    "name": "string",
    "image": "string",
    "description": "string",
    "categoryid": "number",
    "tax": "number"
  }
  ```

### Create a SubCategory

- **Endpoint:** `POST https://menu-management-2csr.onrender.com/subcategory/create`
- **Description:** Create a subcategory.
- **Input:**

  ```json
  {
    "id": "number",
    "old_name": "string",
    "name": "string",
    "image": "string",
    "description": "string",
    "categoryid": "number",
    "tax": "number"
  }
  ```

### Delete a SubCategory

- **Endpoint:** `DELETE https://menu-management-2csr.onrender.com/category/delete`
- **Description:** Delete a subcategory.

## Items API

### Get a Specific Item

- **Endpoint:** `GET https://menu-management-2csr.onrender.com/item/:idOrName`
- **Description:** Retrieve a specific item by its ID or name.

### Get All Items

- **Endpoint:** `GET https://menu-management-2csr.onrender.com/item/all`
- **Description:** Retrieve all Items.

### Get All Items Under a Category

- **Endpoint:** `GET https://menu-management-2csr.onrender.com/item/bycategory/:category_id`
- **Description:** Retrieves all items belonging to a specific category.

### Get All Items Under a Sub-Category

- **Endpoint:** `GET https://menu-management-2csr.onrender.com/item/bysubcategory/:sub-category`
- **Description:** Retrieves all items belonging to a specific sub-category.

### Search the Item by Its Name

- **Endpoint:** `POST https://menu-management-2csr.onrender.com/item/search`
- **Description:** Searches for items based on their name.
- **Input:**
  ```json
  {
    "id": "number",
    "old_name": "string",
    "name": "string",
    "description": "string",
    "taxApplicable": "boolean",
    "tax": "number",
    "baseAmount": "number",
    "discount": "number",
    "categoryid": "number",
    "subcategoryid": "number",
    "image": "string"
  }
  ```

### To Create Item

- **Endpoint:** `POST https://menu-management-2csr.onrender.com/item/create`
- **Description:** Creates a new item.
- **Input:**

  ```json
  {
    "id": "number",
    "old_name": "string",
    "name": "string",
    "description": "string",
    "taxApplicable": "boolean",
    "tax": "number",
    "baseAmount": "number",
    "discount": "number",
    "categoryid": "number",
    "subcategoryid": "number",
    "image": "string"
  }
  ```

### API to Delete the Item

- **Endpoint:** `DELETE https://menu-management-2csr.onrender.com/item/delete/:name_or_id`
- **Description:** Deletes an item by its name or ID.

## How to Start

Instructions on how to start working with the project.

## Local Setup

Download the repository and run the following commands:

```bash
# Step 1: Install packages
npm install

# Step 2: Map your data model to the database schema
npx prisma migrate dev --name init

# Step 3: Compile TypeScript to JavaScript
npm run build

# Step 4: Run the frontend in developer mode
npm run start
```
