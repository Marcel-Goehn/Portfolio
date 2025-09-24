// import * as functions from "firebase-functions";
// import * as nodemailer from "nodemailer";

// const gmailUser = functions.params.defineSecret("GMAIL_USER");
// const gmailPass = functions.params.defineSecret("GMAIL_PASS");

// export const sendMail = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

//   const { name, email, message } = req.body || {};
//   if (!name || !email || !message) {
//     return res.status(400).json({ ok: false, error: "Missing data" });
//   }

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: gmailUser.value(),
//       pass: gmailPass.value()
//     }
//   });

//   await transporter.sendMail({
//     from: `"${name}" <${email}>`,
//     to: gmailUser.value(),
//     subject: `Kontaktformular von ${name}`,
//     html: `<p><b>Name:</b> ${name}</p>
//            <p><b>Email:</b> ${email}</p>
//            <p><b>Nachricht:</b><br>${message}</p>`
//   });

//   res.json({ ok: true });
// });


// import { onRequest } from "firebase-functions/v2/https";

// export const helloWorld = onRequest((req, res) => {
//   res.send("Hello from Firebase Functions!");
// });