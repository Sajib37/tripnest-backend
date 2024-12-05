# Tripnest Backend

Tripnest is a web platform where users can explore and book events. Users can create and update profiles, while admins can manage events, users, and their access rights. The platform employs secure authentication using refresh and access tokens. Admins can block or delete user profiles, and blocked users are restricted from booking events.

## Features

- **User Authentication:** Secure login system using access and refresh tokens for both users and admins.
- **Event Management:**
  - Admins can create, update, and delete events.
  - Users can view, book, and cancel events.
- **Profile Management:**
  - Users can create and update their profiles.
  - Admins can block or delete user profiles.
  - Blocked users cannot book events.
- **Access Control:**
  - APIs are protected with authentication, ensuring that only authorized users can access certain endpoints.
  - Admins have enhanced permissions compared to regular users.



# API Endpoints

## User API Design:
| Params|   API                               |   Description                                   |
|-------------------------------------|-------------------------------------------------|
|user ObjectId| ```PATCH /api/v1/users/change-role/:id``` |Super Admin and Admin can be changed the user role|
|user ObjectId| ```DELET /api/v1/users/delet-user/:id``` | Super Admin and Admin  can be deleted an user|
|| ```GET /api/v1/users/``` | Super Admin and Admin can be get all users|
|user ObjectId| ```PATCH /api/v1/users/blocked-user/:id``` |Super Admin and Admin  can be blocked an user|

## Event API Design:
| Params|   API                               |   Description                                   |
|-------------------------------------|-------------------------------------------------|
|| ```POST /api/v1/event/create-event``` |Super Admin and Admin can can create an event|
|user ObjectId| ```PATCH /api/v1/event/update-event/:id``` | Super Admin and Admin  can be updated an event|
|| ```GET /api/v1/event/``` | everyOne can get all events|
|user ObjectId| ```GET /api/v1/event/:id`` |everyone can get single event by objectId|

## Event Handler API Design:
| Params|   API                               |   Description                                   |
|-------------------------------------|-------------------------------------------------|
|custom event code| ```POST /api/v1/event-handler/booked-event/:eventCode``` |Every user can Booked an event|
|custom event code| ```DELET /api/v1/event-handler/cancel-event/:eventCode``` | Every user can cancel their booked event|
|| ```GET /api/v1/event-handler/my-events``` | everyOne can get their own booked events|
|custom event code| ```GET /api/v1/event-handler/get-all-user-by-event/:eventCode`` |Admin and super admin can get all users who booked an event|

## Profile API Design:
| Params|   API                               |   Description                                   |
|-------------------------------------|-------------------------------------------------|
|custom user id| ```GET /api/v1/profile/:userId``` |Admin and super admin can get a single profile using user custom id|
|| ```POST /api/v1/profile/create-profile``` |Anyone can create their profile|
|profile objectId| ```PATCH /api/v1/profile/update-profile/:id``` | everyOne can update their own profile|
|| ```GET /api/v1/profile/me`` |Every Login user can get their own profile|
|| ```GET /api/v1/profile/`` |Admin and super admin can get all profile|

## Authentication API Design:
|   API                               |   Description                                   |
|-------------------------------------|-------------------------------------------------|
| ```POST /api/v1/auth/login``` |Every signup user can login|
| ```PUT /api/v1/auth/change-password``` |Every Login user can change their password|
| ```POST /api/v1/auth/refresh-token``` |refresh Token API|
| ```POST /api/v1/auth/forget-password`` |Forget password API|
| ```PATCH /api/v1/auth/reset-password`` |reset password API|


## Installation

1. Clone the repo: `git clone https://github.com/Sajib37/tripnest-backend.git`
2. Install dependencies: `npm install`
3. Set up `.env` file.
4. Start server: `npm run start:dev`

