import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect_db } from "./db/connection";
import { organizer_routes } from "./routes/organizer.routes";
import { attendee_routes } from "./routes/attendee.routes";
import { event_routes } from "./routes/event.routes";
import { attendance_routes } from "./routes/attendance.routes";

dotenv.config();

/**
 * The Express application instance.
 */
const app: Express = express();

/**
 * The port number on which the server will listen.
 */
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * Default route handler.
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
// is for look a text when the server is running, in deploy too
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server, Nodejs Backend for Event Management System!");
});

/*
  * Connect to the database and start the server.
*/
connect_db().then(() => {
  /**
   * Start the server.
   */
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});

/**
 * Register the routes for organizers, attendees, events, and attendance.
 */
organizer_routes(app);
attendee_routes(app);
event_routes(app);
attendance_routes(app);

export default app;
