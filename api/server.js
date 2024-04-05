import "dotenv/config";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors());
app.use(express.json());
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
};

const register = async (userName, emailId, password) => {
  const hash = bcrypt.hashSync(password, salt);
  await db.query(
    "INSERT INTO user_data(user_name, email_id, password) VALUES($1, $2, $3)",
    [userName, emailId, hash]
  );
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

app.get("/", async (req, res) => {
  res.send("Hack IT!");
});

app.post("/register/:kind", async (req, res) => {
  const kind = req.params.kind;
  if (kind === "mentor") {
    mentorRegister("Mohan", "mohan@doc.com", "doc4life", "Conusellor");
  } else register("rat", "rodent@rat.com", "cheese");
  res.send("Registered");
});

app.post("/login/:kind", async (req, res) => {
  const kind = req.params.kind;
  if (kind === "mentor") {
    mentorLogin("mohan@doc.com", "doc4life")
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
  } else if (kind === "user") {
    login("rodent@rat.com", "chese")
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
      console.log(response.rows);
      res.send(response.rows);
    }
  });
});

app.post("/confess", async (req, res) => {
  await db.query("INSERT INTO confessions (confession) VALUES($1)", [
    "I'm Gay!",
  ]);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
