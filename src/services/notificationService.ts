// import { PrismaClient } from '@prisma/client';
// import nodemailer from 'nodemailer';
// import schedule from 'node-schedule';

// const prisma = new PrismaClient();

// // Function to send email notifications
// const sendEmail = async (to: string, subject: string, text: string) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'your-email@gmail.com',
//             pass: 'your-email-password',
//         },
//     });

//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to,
//         subject,
//         text,
//     };

//     await transporter.sendMail(mailOptions);
// };

// // Function to check and send reminders
// const checkReminders = async () => {
//     const reminders = await prisma.medication_reminders.findMany({
//         where: {
//             reminder_time: {
//                 lte: new Date(),
//             },
//         },
//     });

//     for (const reminder of reminders) {
//         const patient = await prisma.patients.findUnique({
//             where: { id: reminder.patient_id },
//         });

//         if (patient) {
//             await sendEmail(patient.email, 'Medication Reminder', `It's time to take your medication: ${reminder.medication_name}`);
//         }
//     }
// };

// // Schedule the reminder check every minute
// schedule.scheduleJob('* * * * *', checkReminders);

// export default checkReminders;
