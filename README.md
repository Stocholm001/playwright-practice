# playwright-practice
Playwright practice project for automation training




# Run Projects Code
npx playwright test --project=boss
npx playwright test --project=girlfriend







# Diagram Flow Login Global
START RUN
   │
   ▼
Load playwright.config.ts
   │
   ▼
Run globalSetup (ถ้ามี)
   │
   ▼
Login → save storageState.json
   │
   ▼
Start Tests
   │
   ├── Test ที่ใช้ storageState
   │        │
   │        ▼
   │   เปิด browser พร้อม session (Login แล้ว)
   │
   └── Test ที่ใช้ storageState: undefined
            │
            ▼
        เปิด browser ใหม่ (ยังไม่ Login)






==============================
TEST SUITE: SAUCEDEMO E2E FLOW
==============================


--------------------------------
TC001 - Login with valid user
--------------------------------
Objective:
Verify user can login successfully.

Test Data:
Username: standard_user
Password: secret_sauce

Steps:
1. Open https://www.saucedemo.com/
2. Enter username
3. Enter password
4. Click Login

Expected Result:
- Redirect to /inventory.html
- Product list is displayed


--------------------------------
TC002 - Login with invalid password
--------------------------------
Objective:
Verify error message when password is incorrect.

Test Data:
Username: standard_user
Password: wrong_password

Steps:
1. Open website
2. Enter username
3. Enter wrong password
4. Click Login

Expected Result:
- Error message displayed
- User remains on login page


--------------------------------
TC003 - Login with locked user
--------------------------------
Objective:
Verify locked user cannot login.

Test Data:
Username: locked_out_user
Password: secret_sauce

Steps:
1. Open website
2. Enter locked_out_user
3. Enter password
4. Click Login

Expected Result:
- Error message about locked user


--------------------------------
TC004 - Verify product list
--------------------------------
Objective:
Verify inventory page shows products.

Pre-condition:
User already logged in

Steps:
1. Check product list

Expected Result:
- 6 products displayed
- Each product has:
  - Name
  - Price
  - Add to cart button


--------------------------------
TC005 - Sort product by price low to high
--------------------------------
Objective:
Verify sorting functionality.

Pre-condition:
User logged in

Steps:
1. Select sort dropdown
2. Choose "Price (low to high)"

Expected Result:
- Products sorted from lowest to highest price


--------------------------------
TC006 - Add product to cart
--------------------------------
Objective:
Verify product can be added to cart.

Steps:
1. Login
2. Click "Add to cart" on one product
3. Click cart icon

Expected Result:
- Product displayed in cart
- Cart badge shows "1"


--------------------------------
TC007 - Remove product from cart
--------------------------------
Objective:
Verify product can be removed.

Steps:
1. Add product to cart
2. Click Remove

Expected Result:
- Product removed
- Cart badge disappears


--------------------------------
TC008 - Complete checkout
--------------------------------
Objective:
Verify successful checkout process.

Steps:
1. Add product to cart
2. Go to cart
3. Click Checkout
4. Enter First Name
5. Enter Last Name
6. Enter Postal Code
7. Click Continue
8. Click Finish

Expected Result:
- Message displayed:
  "Thank you for your order!"


--------------------------------
TC009 - Checkout without information
--------------------------------
Objective:
Verify validation message appears.

Steps:
1. Add product
2. Go to Checkout
3. Click Continue without filling form

Expected Result:
- Error message displayed


--------------------------------
TC010 - Logout
--------------------------------
Objective:
Verify user can logout.

Steps:
1. Login
2. Open menu
3. Click Logout

Expected Result:
- Redirect to login page