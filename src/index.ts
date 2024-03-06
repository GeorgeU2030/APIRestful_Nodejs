import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect_db } from "./db/connection";
import { organizer_routes } from "./routes/organizer.routes";
import { attendee_routes } from "./routes/attendee.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

connect_db().then(() => {
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
});

organizer_routes(app);
attendee_routes(app);
