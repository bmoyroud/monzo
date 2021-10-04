require("dotenv").config();

const Monzo = require("../dist").default;

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;
  const accountId = process.env.ACCOUNT_ID;

  const imageURL =
    "https://upload.wikimedia.org/wikipedia/en/e/ed/Nyan_cat_250px_frame.PNG";

  try {
    const monzo = new Monzo(accessToken);

    await monzo.feed.create({
      account_id: accountId,
      type: "basic",
      params: {
        title: "feed item title",
        image_url: imageURL,
      },
    });
    console.log("Feed item successfully created.");
  } catch (err) {
    console.log("Error", err);
  }
})();
