import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import axios from "axios";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5173;
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const db = new pg.Client({
  user: "postgres",
  host: "localHost",
  database: "HackByte",
  password: "Aryan^(",
  port: "5432",
});
db.connect();

const mentorRegister = async (
  mentorName,
  mentorEmail,
  mentorPassword,
  profession
) => {
  const hash = bcrypt.hashSync(mentorPassword, salt);
  await db.query(
    "INSERT INTO mentor_data(mentor_name, mentor_email, mentor_password, profession) VALUES($1, $2, $3, $4)",
    [mentorName, mentorEmail, hash, profession]
  );
  res.send("Registered as a mentor");
};

const register = async (userName, emailId, password) => {
  const hash = bcrypt.hashSync(password, salt);
  await db.query(
    "INSERT INTO user_data(user_name, email_id, password) VALUES($1, $2, $3)",
    [userName, emailId, hash]
  );
  res.send("Registered as a User!");
};

const mentorLogin = (mentorEmail, mentorPassword) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT mentor_password FROM mentor_data WHERE mentor_email = $1",
      [mentorEmail],
      (err, response) => {
        if (err) {
          console.error("Error in login", err.stack);
          reject(err);
        } else {
          if (response.rows.length > 0) {
            const isMatch = bcrypt.compareSync(
              mentorPassword,
              response.rows[0].mentor_password
            );
            resolve(isMatch);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

const login = (emailId, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT password FROM user_data WHERE email_id = $1",
      [emailId],
      (err, response) => {
        if (err) {
          console.error("Error in login", err.stack);
          reject(err);
        } else {
          if (response.rows.length > 0) {
            const isMatch = bcrypt.compareSync(
              password,
              response.rows[0].password
            );
            resolve(isMatch);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};

app.post("/register/:kind", async (req, res) => {
  const kind = req.params.kind;
  if (kind == "mentor") {
    mentorRegister(
      req.body.mentorName,
      req.body.mentorEmail,
      req.body.mentorPassword,
      req.body.profession
    );
  } else if (kind == "user")
    register(req.body.userName, req.body.emailId, req.body.password);
  res.send("Registered");
});

app.post("/login/:kind", async (req, res) => {
  const kind = req.params.kind;
  if (kind == "mentor") {
    mentorLogin(req.body.mentorEmail, req.body.mentorPassword) //"doc4life"
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          res.send("mValid");
        } else {
          res.send("mInvalid");
        }
      })
      .catch((error) => {
        res.status(404);
        console.error(error);
      });
  } else if (kind == "user") {
    login(req.body.emailId, req.body.password) // cheese
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          res.send("Valid");
        } else {
          res.send("Invalid");
        }
      })
      .catch((error) => {
        res.status(404);
        console.error(error);
      });
  }
});

app.get("/confessions", async (req, res) => {
  await db.query("SELECT confession FROM confessions", (err, response) => {
    if (err) console.error("Error getting Confessions", err.stack);
    else {
      res.send(response.rows);
    }
  });
});

app.post("/confess", async (req, res) => {
  await db.query("INSERT INTO confessions (confession) VALUES($1)", [
    req.body.confess,
  ]);
  res.send("Confession Submitted Successfully!");
});

app.post("/auth", async (req, res) => {
  const { username } = req.body;
  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "406a7882-9f1f-422f-84b4-18bc5f692bda" } }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
