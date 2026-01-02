const cron = require("node-cron");
const { db } = require("../config/firebase");
const { sendDeadlineEmail } = require("../utils/mailer");

//cron.schedule("0 */6 * * *", async () => {
cron.schedule("* * * * *", async () => {

  console.log("⏰ Checking upcoming deadlines...");

  const snapshot = await db.collection("opportunities").get();
  const now = new Date();

  for (const doc of snapshot.docs) {
    const opp = doc.data();
    if (!opp.reg_last_date) continue;

    const deadline = new Date(opp.reg_last_date);
    const diffDays = Math.ceil(
      (deadline - now) / (1000 * 60 * 60 * 24)
    );

    // Notify only for upcoming deadlines
    if (diffDays === 7 || diffDays === 3 || diffDays === 1) {
      const usersSnap = await db.collection("users").get();

      for (const userDoc of usersSnap.docs) {
        const user = userDoc.data();
        if (!user.email) continue;

        await sendDeadlineEmail(
          user.email,
          `⏳ Deadline Approaching: ${opp.title}`,
          `
            <h3>${opp.title}</h3>
            <p>Deadline in <b>${diffDays} day(s)</b></p>
            <p>Organization: ${opp.organization}</p>
          `
        );
      }
    }
  }
});
