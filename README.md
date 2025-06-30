# ShopFusionS

ShopFusion is a full-stack e-commerce web application featuring a modern shopping experience, user authentication, cart and order management, coupon/discount logic, and an admin/user dashboard. The project is built with a Node.js/Express backend and a vanilla JavaScript/HTML/CSS frontend.

## Features

- User registration and login (with authentication)
- Product catalog with size selection
- Add to cart, update, and remove items
- Apply coupons for discounts (DISCOUNT10, SAVE50, FREESHIP)
- Checkout and payment (with QR and UPI options)
- Order placement (login required)
- Order details saved in MongoDB (including size, discounts, user info)
- User dashboard to view and cancel orders
- Admin dashboard for order management
- Responsive design for all devices

## Project Structure

```
ShopFusion-MiniProject/
  BackEnd/
    ShopFusion-backend/
      Server.js
      models/
      routes/
      controllers/
      config/
  FrontEnd/
    index.html
    Shop.html
    cart.html
    payment.html
    dashboard.html
    about.html
    contact.html
    script.js
    auth.js
    style.css
    images/
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to `BackEnd/ShopFusion-backend`:
   ```sh
   cd BackEnd/ShopFusion-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure MongoDB connection in `config/connection.js` or `.env` as needed.
4. Start the backend server:
   ```sh
   node Server.js
   ```
   The backend runs on `http://localhost:5000` by default.

### Frontend Setup
1. Open `FrontEnd/index.html` in your browser (or use Live Server in VS Code).
2. All frontend files are static and require no build step.

## Usage
- Register or log in as a user.
- Browse products, select sizes, and add to cart.
- Apply coupons in the cart for discounts.
- Proceed to checkout and payment.
- View your orders and details in the dashboard.
- Admins can manage orders via the dashboard.

## Coupon Codes
- `DISCOUNT10`: 10% off for orders >= Rs.1000

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB


## License
This project is for educational purposes. Feel free to use and modify it.

---

**Developed by Atharva Pawar**

