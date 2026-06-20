require("dotenv").config();
const axios = require("axios");

const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

app.command("/verstappen-ping", async ({ command,ack,respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency:${latency}ms` });
});

app.command("/verstappen-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/verstappen-ping - Check bot latency
/verstappen-quote - Get a quote from the dutchman himself
/verstappen-info - Info on the GOAT
/verstappen-joke - Jokes`
  });
});

app.command("/verstappen-quote", async ({ ack, respond }) => {
    await ack();

    const quotes = [
        "Simply Lovely",
        "If my mom had balls she'd be my dad",
        "Is Charles catching him or not?",
        "The only place that matters is first",
        "I want to win because I am the fastest out there instead, not by luck; then it means a lot more to you"   
    ];

    try {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await respond({ text: `\n${randomQuote}` });
    } catch (err) {
        await respond({ text: "Red Bull was so bad that it didn't start"});
    }
});

app.command("/verstappen-info", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://api.openf1.org/v1/drivers", {
            timeout: 5000,
params: {
    driver_number: 3,
    session_key: "latest"
}
        });

        const maxData = response.data[0];

        if (maxData) {
            await respond({
                text: `Driver profile: ${maxData.broadcast_name}\n${maxData.full_name}\nNumber: ${maxData.driver_number}\nTeam: ${maxData.team_name}\nCountry: ${maxData.country_code}\nAcronym: ${maxData.name_acronym}`
            });
        } else {
            await respond({ text: "Red Bull was so bad that they wouldn't give you info" });
        }
    } catch (err) {
        console.error("api error", err.message);
        await respond({ text: "No data fetched, check server" });
    }
});

app.command("/verstappen-joke", async ({ ack, respond }) => {
    await ack();

    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
            await respond({
                text:
                `${response.data.setup}
                
                ${response.data.punchline}`
            });
    }  catch (err) {
        await respond({ text: "Failed to fetch a joke." });
    }
});

(async () => {
    await app.start();
    console.log("bot is running!");
})();

