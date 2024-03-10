# APIRestful_Nodejs

## Deploy on Vercel 

### Taller Node js

[![Deployed with Vercel](https://vercel.com/button)](https://tallernodejs.vercel.app/)

## Introduction

This project aims to develop a robust backend application with Node.js, using TypeScript for strong typing and MongoDB for data persistence. The application will allow CRUD operations (Create, Read, Update, Delete) on users and groups, manage user authentication, and enable the association between users and groups, as well as querying such associations. 

## Technologies Used

- Node.js
- TypeScript
- Express
- MongoDB

## Endpoints

- `/register_for_event/:id`: Allows a user to register for an event.
- `/registered_events`: Returns a list of all events for which a user is registered.
- `/attendees/:id`: Returns a list of all attendees for an event.
- `/create_attendee`: Creates a new attendee.
- `/login_attendee`: Authenticates an attendee.
- `/events`: Returns a list of all events.
- `/event/:id`: Returns details of a specific event.
- `/create_event`: Creates a new event.
- `/update_event/:id`: Updates details of an existing event.
- `/delete_event/:id`: Deletes an existing event.
- `/create_organizer`: Creates a new organizer.
- `/login_organizer`: Authenticates an organizer.

## Installation and Usage

1. Clone the repository: `git clone https://github.com/your_username/APIRestful_Nodejs.git`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following content:
write a enviroment variable called MONGO_URI with the actual URI for your MongoDB database.
4. Run the application in development mode: `npm run dev`

## Contributions

Contributions made by:
- George Trujillo
- Ricardo Medina
- Samuel Soto

## Project

Internet Computing III - Icesi University - Cali - Valle del Cauca - Colombia

## Contact

For more information, feel free to contact us through our GitHub profiles:
- George Trujillo: [GeorgeU2030](https://github.com/GeorgeU2030)
- Ricardo Medina: [Skydoes10](https://github.com/Skydoes10)
- Samuel Soto: [github_username_samuel]
