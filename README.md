# Wanderlust

Wanderlust is a web application that allows users to explore and book unique accommodations, including houses, rooms, castles, and camping spots. The project integrates a free map API (OpenStreetMap) and provides user authentication, reviews, and category-based filtering.

## 🚀 Features
- 🏠 **Browse Listings:** View various accommodations like houses, rooms, castles, and more.
- 🔍 **Search & Filters:** Search destinations and filter properties by categories (Trending, Mountains, Camping, etc.).
- 🗺 **Map Integration:** Displays property locations using OpenStreetMap.
- 📝 **User Reviews:** Users can leave reviews and ratings.
- 🔐 **Authentication:** Secure login and signup using Passport.js.
- 🛒 **Tax Toggle:** Users can toggle to see the total price including taxes.
- 📄 **Privacy & Terms Pages:** Dedicated sections for privacy policy and terms & conditions.

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Atlas), Mongoose
- **Frontend:** HTML, CSS, JavaScript, EJS (Embedded JavaScript)
- **Authentication:** Passport.js (Local Strategy)
- **Session Management:** Express-session & connect-mongo
- **Styling:** Bootstrap & Font Awesome
- **Deployment:** (To be decided - Render, Vercel, or Heroku)

---

## 🏗 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Setup environment variables
Create a `.env` file and add the following:
```env
ATLASDB_URL=your-mongodb-url
SECRET=your-secret-key
NODE_ENV=development
```

### 4️⃣ Start the server
```sh
npm start
```
The app will run on `http://localhost:8080`

---

## 📂 Project Structure
```
wanderlust/
│-- public/         # Static files (CSS, JS, Images)
│-- routes/         # Express route files (user, listings, reviews, privacy, terms)
│-- views/          # EJS templates
│-- models/         # Mongoose schemas (User, Listing, Review)
│-- utils/          # Helper functions (Error handling, wrapAsync)
│-- .env            # Environment variables
│-- app.js          # Main application file
│-- package.json    # Dependencies & Scripts
```

---

## 📜 Routes Overview

### **User Routes** (`/`)
- `GET /register` - User registration page
- `POST /register` - Create a new user
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `GET /logout` - Log out user

### **Listing Routes** (`/listings`)
- `GET /listings` - View all listings
- `GET /listings/:id` - View a specific listing
- `POST /listings` - Add a new listing
- `PUT /listings/:id` - Update a listing
- `DELETE /listings/:id` - Remove a listing

### **Review Routes** (`/listings/:id/review`)
- `POST /listings/:id/review` - Add a review
- `DELETE /listings/:id/review/:reviewId` - Delete a review

### **Privacy & Terms**
- `GET /privacy` - View Privacy Policy
- `GET /terms` - View Terms & Conditions

---

## 📌 To-Do List
- ✅ Implement search and category filtering
- ✅ Integrate OpenStreetMap for property locations
- ✅ Add authentication with Passport.js
- 🔲 Deploy the project
- 🔲 Implement payment gateway

---

## 🏆 Contributing
Feel free to open an issue or submit a pull request! 😊

---

## 📄 License
This project is licensed under the **MIT License**.

**Enjoy using Wanderlust! 🌍✈️**

