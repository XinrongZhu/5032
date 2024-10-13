const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.countUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersCollection = admin.firestore().collection("users");
      const snapshot = await usersCollection.get();
      const count = snapshot.size;

      res.status(200).send({ count });
    } catch (error) {
      console.error("Error counting users:", error.message);
      res.status(500).send("Error counting users");
    }
  });
});

