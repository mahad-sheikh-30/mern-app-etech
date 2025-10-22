🎓 E-Tech Learning Platform (MERN Version)

A full-stack E-Learning Platform built with React (Vite), Node.js/Express, MongoDB (Mongoose), and JWT Authentication.
This version replaces Firebase with a custom backend authentication flow, MongoDB for persistence, and uses Joi + bcrypt for secure validation and password management.


🌐 Overview

E-Tech provides an interactive online learning experience where:
Admins manage courses, teachers, and student enrollments.
Students browse, enroll, and purchase paid courses securely.
Guests can explore free courses and learn more about the platform.
This version introduces a complete MERN architecture with database models, authentication middleware, and clean REST APIs.


👨‍🏫 User Roles


Admin	     admin@etech.com               Admin.123  --- 	       
Student 1  ameerhamza68@gmail.com        Etech.123	---        
Student 2  mominsheikh718@gmail.com      Momin.123	---        
Student 3  mahadishfaq68@gmail.com       Mahad.123	---        

You can also register new accounts using Email or Google Sign-In.


🚀 Core Features


🔐 Authentication

Email + Password registration/login
Google Sign-In using OAuth 2.0
Custom JWT generation and verification
Secure password hashing with bcrypt
Input validation with Joi and joi-password-complexity


🧑‍💼 Admin Dashboard

Restricted to admin accounts only
Add / Edit / Delete Courses and Teachers
Manage Users, Enrollments, and Transactions
Protected backend routes with JWT middleware


🎓 Student Features

Browse all courses (free + paid) --
Enroll in available courses --
Role automatically changes to “student” upon first enrollment -- 
View enrolled courses



Screenshots:

<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/3fccaa94-09e5-466b-905f-64ab9d0ddb04" />

<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/8ccc0632-ba26-4357-9a0e-5d0605f8877b" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/973b7757-9d1c-46be-b468-ab16dfabbf87" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/d72e463e-22b6-43ef-9aa9-45c338bf0bee" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/d83ea56e-24e8-4a07-a87d-5df92ed4c93b" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/0bf0dcd9-02ab-4082-88d4-b147bdec37a3" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/5399f4ee-cc54-40e1-aa6e-0af5053d9854" />

<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/677cd292-f721-4aa2-ab7a-653c801734cf" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/465e810c-43dd-4e77-be0b-14e926d15267" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/c5f7e8d3-581a-4722-84ce-c3176477c5a6" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/17213072-67da-4419-b750-19902f09e868" />
<img width="500" height="280" alt="image" src="https://github.com/user-attachments/assets/8a251a5a-801a-476e-a476-7b8f3dac85b7" />











🧰 Tech Stack

Frontend	  |   React (Vite) + TypeScript, React Router, React Query  ---
Styling	    |    CSS  ---
Backend	    |    Node.js + Express ---
Database	  |  MongoDB + Mongoose ---
Authentication	|  Custom JWT + Google OAuth2 ---
Validation	    |  Joi + joi-password-complexity ---





🔄 Authentication & Enrollment Flow

User signs in via Email/Password or Google OAuth.
Backend verifies credentials and issues a JWT token.
Token is stored in localStorage and used for secure API calls.
Middleware (auth.js) validates tokens for protected routes.
Enrollments are managed via MongoDB collections for Users, Courses, and Enrollments.
On first enrollment, user role auto-updates to student.


⚙️ Setup Instructions

1️⃣ Clone Repository
git clone https://github.com/mahad-sheikh-30/my-project-mern.git  --
cd my-project-mern

2️⃣ Backend Setup
cd backend --
npm install --
npx nodemon server.js 


Runs on → http://localhost:8080

3️⃣ Frontend Setup
cd frontend --
npm install --
npm run dev 


Runs on → http://localhost:5173

⚠️ Make sure your .env files are properly configured in both frontend and backend before running the app.

🧾 Example .env Files
🔙 Backend (.env)
PORT=8080  ----
DB=mongodb+srv://<username>:<password>@cluster.mongodb.net/etech ----
JWT_SECRET=your_jwt_secret  ----
GOOGLE_CLIENT_ID=your_google_client_id ----

🎨 Frontend (.env)
VITE_GOOGLE_CLIENT_ID=your_google_client_id --- 
VITE_BACKEND_URL=http://localhost:8080  ---

🔗 Key API Routes (Express Backend)

POST	/api/auth	Email/password login	Public  --- 
POST	/api/signup	Register new user	Public  ---
POST	/api/google-auth	Google Sign-In	Public  ---
POST	/api/enroll	Enroll in course	Authenticated ---
GET	/api/enrollments	View all enrollments	Admin ---
GET	/api/enrollments/my	Get enrolled courses	Authenticated ---
DELETE	/api/enrollments/:id	Unenroll (admin only)	Admin ---


🔒 Authentication Middleware

auth.js — verifies JWT token and attaches user to req.user.
admin.js — restricts routes to admin role only.
Both applied to critical routes like enrollments and course management.


💾 MongoDB Models

User → name, email, password, role, JWT generator method
Course → title, price, teacherId, studentsCount
Enrollment → userId, courseId, timestamps (unique pair)
All models use Mongoose schema validation and references for population.


🔮 Future Enhancements

✅ Add Facebook OAuth2
✅ Email verification & password reset
✅ Payment integration (Stripe or Razorpay)
✅ Course progress tracking
✅ Teacher dashboard
✅ Dark mode toggle


👨‍💻 Developer

Mahad Ishfaq
Full-Stack Developer (MERN + JWT + MongoDB)
📧 mahadishfaq68@gmail.com

👨‍🏫 Instructor

Asad Ali
JavaScript Engineer / Internship Mentor

🏁 Conclusion

This project demonstrates a complete MERN-based E-Learning Platform featuring:
Custom JWT authentication - 
Secure password encryption - 
Google OAuth2 login - 
REST API structure with Express - 
MongoDB models and relations - 
Fully responsive frontend built with React (Vite)

It serves as a full production-ready example of a secure, modular, and scalable web application, developed as part of an internship evaluation.
