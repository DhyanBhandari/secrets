# secrets
Secrets Sharing Web App
This is a simple web application that allows users to share secrets anonymously. Users can register and log in to the platform using their local credentials or their Google account. They can then submit their secrets and view secrets shared by other users.
![Screenshot (355)](https://github.com/DhyanBhandari/secrets/assets/109520497/c5ebbbc2-3ad1-4a50-b00b-6c07d61227f0)

# Installation and Setup
Make sure you have Node.js installed on your system.

Clone this repository or download the code as a ZIP file and extract it to your desired location.

Open a terminal or command prompt and navigate to the project folder.

Install the required Node.js packages using npm (Node Package Manager). Run the following command:


npm install
Create a .env file in the project root folder. Add the following environment variables to it:

makefile

CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
API_KEY=YOUR_API_KEY
Replace YOUR_GOOGLE_CLIENT_ID, YOUR_GOOGLE_CLIENT_SECRET, and YOUR_API_KEY with your actual Google API credentials and any other necessary API keys.

Start the MongoDB server. If you have MongoDB installed globally, you can simply run:


mongod
Note: If you encounter any issues starting MongoDB, please refer to the official MongoDB documentation for troubleshooting.

Once MongoDB is running, you can start the web application. In the terminal, run:

```
node app.js
```
You should see a message indicating that the server has started on port 3000.

Open your web browser and go to http://localhost:3000 to access the secrets sharing web application.

# Usage
Home Page
The home page displays the landing page of the web application. You can either go to the login or register page from here.

# Register
On the register page, users can sign up for the application by providing a username and password. The user's password is securely hashed and stored in the database using passport-local-mongoose.

# Login
Users can log in to the application using their registered credentials on the login page.

# Google Authentication
Alternatively, users can click on the "Login with Google" button to sign in using their Google account. The application uses the Google OAuth 2.0 strategy (passport-google-oauth20) for authentication.

# Secrets Page
Once logged in, users can view and share secrets on the "Secrets" page. Users can submit their secrets anonymously, which will be displayed along with secrets from other users.

# Submitting Secrets
Logged-in users can submit their secrets by clicking on the "Submit" button on the navigation bar. They will be redirected to the submission page, where they can enter their secret and submit it.

# Logging Out
Users can log out of the application by clicking on the "Logout" button on the navigation bar.

# Technologies Used
Node.js
Express.js
MongoDB
Mongoose
EJS (Embedded JavaScript) - Templating engine for dynamic HTML rendering.
Passport.js - Authentication middleware for Node.js.
passport-local-mongoose - Mongoose plugin for simplifying local authentication.
passport-google-oauth20 - Google OAuth 2.0 authentication strategy for Passport.js.
