"# Edu-Content-Management-System" 


Introduction <br>
This project is designed to provide a comprehensive backend solution for managing courses and lessons. The implementation includes user registration and authentication, course creation and management, and search functionality, with a focus on security and performance. <br><br><br>

Setup Instructions<br>
To set up the project locally, follow these steps:<br><br><br>

Prerequisites<br>
Node.js (v14+)<br>
npm (v6+)<br>
SQLite3 (or any other preferred database)<br>
Git<br><br><br>
Installation<br>
Clone the repository: git clone https://github.com/your-username/your-repository.git<br>
cd your-repository<br>
Install dependencies: npm install <br>
Set up environment variables: Create a .env file in the root directory and add the following variables:<br><br><br>

Run database migrations:<br><br>


npx sequelize-cli db:migrate<br>
Start the server: npm start<br>
The server should now be running on http://localhost:5000.  <br>

API Documentation
1. User Registration
Method: POST
Endpoint: /api/auth/register
Request Body:
json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
Response:
json

{
  "message": "User registered successfully!"
}
2. User Login
Method: POST
Endpoint: /api/auth/login
Request Body:
json

{
  "email": "testuser@example.com",
  "password": "password123"
}
Response:
json

{
  "status": true,
  "user": { ...userDetails },
  "token": "jwt_token_here"
}
3. Create Course
Method: POST
Endpoint: /api/content/courses
Request Body:
json

{
  "title": "Introduction to Node.js",
  "description": "A beginner's guide to Node.js and Express."
}
Response:
json

{
  "id": 1,
  "title": "Introduction to Node.js",
  "description": "A beginner's guide to Node.js and Express.",
  "createdAt": "...",
  "updatedAt": "..."
}
4. Get Courses
Method: GET
Endpoint: /api/content/courses
Response:
json

[
  {
    "id": 1,
    "title": "Introduction to Node.js",
    "description": "A beginner's guide to Node.js and Express.",
    "createdAt": "...",
    "updatedAt": "...",
    "lessons": [
      {
        "title": "Lesson 1: Setting Up Your Environment"
      },
      ...
    ]
  },
  ...
]
5. Search Courses
Method: GET
Endpoint: /api/search/courses
Query Parameters:
keyword: The search term to look for in course titles.
Response:
json

[
  {
    "id": 1,
    "title": "Introduction to Node.js",
    "description": "A beginner's guide to Node.js and Express."
  },
  ...
]
6. Update Course
Method: PUT
Endpoint: /api/content/courses/:id
Request Body:
json

{
  "title": "Updated Title",
  "description": "Updated description."
}
Response:
json

{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated description.",
  "createdAt": "...",
  "updatedAt": "..."
}
7. Delete Course
Method: DELETE
Endpoint: /api/content/courses/:id
Response:
json

{
  "message": "Course deleted"
}

<br><br><br><br>
Assumptions and Decisions
<br>
Database: SQLite was chosen for simplicity and ease of setup during development. The setup can easily be switched to a more robust database like PostgreSQL or MySQL.<br>
Validation: The express-validator package was used for input validation to ensure data integrity.<br>
Caching: NodeCache was implemented to improve performance for frequently accessed data.<br>
Security: JWT (JSON Web Token) was used for authentication, ensuring secure API endpoints.<br>
Approach and Design<br>
Database Design and Schema<br>
User Table: Stores user details, including username, email, and hashed passwords.<br>
Course Table: Stores information about each course, including title and description.<br>
Lesson Table: Each lesson is linked to a specific course via a foreign key.<br>
The database schema was designed with simplicity and normalization in mind, ensuring that data is stored efficiently and relationships between tables are clearly defined.<br>

Security and Performance<br>
Authentication: JWT-based authentication ensures secure API access, with tokens being signed using a secret key.<br>
Input Validation: express-validator was used to validate user inputs, protecting the application from common vulnerabilities like SQL injection.<br>
Caching: NodeCache was implemented to store frequently accessed data (e.g., course listings) to reduce database load and improve response times.<br>
Challenges and Solutions<br>
Database Migration: Managing database migrations and ensuring consistency across different environments was a challenge, which was solved by carefully structuring migration files and running tests after each migration.<br>
Security: Ensuring that all API endpoints are secure, especially handling authentication tokens, was a key focus. Implementing JWT with proper expiration times and validation checks helped secure the application.<br>
Performance Optimization: Caching was a critical step in optimizing the performance of the application. By caching frequently accessed data, the load on the database was reduced, resulting in faster API responses.<br>





