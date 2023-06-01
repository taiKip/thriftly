# Frontend Project

## Expectation

### `Tech Stack:`

React, TypeScript and Redux. And for styling, choose whatever you like (ideally, something you already know.)

### `Outcome:`

Build a front end for an E-commerce or a Library System and deploy it.

**An E-commerce website**

you have to have `at least` these data sources:
(the properties that being mentioned are the minimum)

- Products
  - id
  - name
  - description
  - categories
  - variants
  - sizes
- Orders
  - productId
  - userId
  - purchasedAt
- Users (as visitor or admin)
  - firstName (from google)
  - lastName (from google)
  - email (from google)

**Use cases:**

Visitor can:

- login (using login via google)
- explore list of products
- filter and search
- Add to a cart
- checkout product/s

Admin can:

- add new product
- update info of a product
- remove a product
- ban a user

PS. if you want to store some data, you could use LocalStorage for now.

---

## Way of working

Your task here is to prepare the UI part of it and its functionalities ie.
you are working on the UI of adding new item

here's how to approach it:

1. create the UI part (including form)
2. handle the validation
3. make sure the form is working and when you submit you get the new item
4. send it to Redux and skip the part where you send a request (you will add it later) and return the new data to the state.

---

## Lastly

Any additional features are welcome, like switching theme or other cool stuff. **but make sure you work on the required ones first.**
# ecomerce-app
