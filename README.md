Tournament Management System

Project Overview
A full-stack tournament management platform built with:

Backend: Spring Boot (Java)

Web Admin: React.js

Mobile App: React Native

Prerequisites
Java 17+

Node.js 16+

npm 8+ or yarn

MySQL 8+

Android Studio (for mobile development)
-------------------------------------------------------
Backend Setup (Spring Boot)
Installation
Navigate to the backend directory:
Configure database in application.properties:

properties
spring.datasource.url=jdbc:mysql://localhost:3306/esport_db
spring.datasource.username=root
spring.datasource.password=yourpassword
Build and run
-------------------------------------------------------
Web Admin Setup (React.js)
Installation
Navigate to the web  directory:

Install dependencies:

npm install

Start development server:

npm run dev
-------------------------------------------------------
Mobile App Setup (React Native)
Installation
Navigate to the mobile-app directory:

Install dependencies:

npm install

Run on Android:

npx react-native run-android

Run on iOS:

bash
npx react-native run-ios
-------------------------------------------------------

Environment Variables
Variable |	Description | Required
DB_URL | Database connection URL |	Yes
JWT_SECRET | JWT signing secret | Yes