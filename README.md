# Wanderlust

Wanderlust is a travel listing web application built using Node.js, Express, MongoDB, and Passport.js for authentication. This project allows users to sign up, log in, create listings, and post reviews.

## Features
- User authentication (signup, login, logout) using Passport.js
- CRUD operations for travel listings
- Review system for listings
- Flash messages for user-friendly notifications
- Session management with Express-session
- Server-side form validation with Joi
- Error handling with custom middleware

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Passport.js (Local Strategy)
- **Templating Engine:** EJS
- **Middleware:** Express-session, Connect-flash, Method-override

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start MongoDB:
   ```sh
   mongod
   ```
4. Run the application:
   ```sh
   node app.js
   ```
5. Open in browser:
   ```
   http://localhost:8080
   ```

## Folder Structure
```
wanderlust/
|-- models/         # Mongoose schemas (User, Listing, Review)
|-- routes/         # Express route handlers (User, Listings, Reviews)
|-- public/         # Static assets (CSS, images, scripts)
|-- views/          # EJS templates
|-- utils/          # Helper functions & error handling
|-- schema.js       # Joi validation schemas
|-- app.js          # Main Express application file
|-- package.json    # Node.js dependencies
|-- README.md       # Project documentation
```

## Usage
- **Create an account**: Sign up for an account to start using the platform.
- **Add listings**: Create new travel listings with descriptions and images.
- **Review listings**: Post reviews for listings and interact with other users.

## Contributions
Contributions are welcome! Feel free to fork this repo, submit pull requests, or report issues.

## License
This project is licensed under the MIT License.

---

Made with ❤️ by SIDDHANT SAXENA

