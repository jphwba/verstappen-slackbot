# Verstappen Slackbot
## Commands

/verstappen-ping - Check bot latency\
/verstappen-quote - Get a quote from the dutchman himself\
/verstappen-info - Info on the GOAT\
/verstappen-joke - Jokes\
/verstappen-season [Year] - type any year from 2015 to 2025 to get seasonal stats on every season from Verstappen`

### Example

```
/verstappen-season 2023
```

```
Max Verstappen = 2023 Season
Team: Red Bull
Championship Position: P1
Points: 575
Races: 22
Wins: 19
Podiums: 21
DNFs: 0
```
### Prerequisites

- Node.js v18 or higher
- A Slack app with slash commands enabled

### Installation

1. Clone the repo

```bash
git clone https://github.com/jphwba/verstappen-slackbot.git
cd verstappen-slackbot
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
```

4. Start the bot

```bash
node index.js
```

### Slack App Configuration

In your Slack app settings, register the following slash commands
- `/verstappen-ping`
- `/verstappen-joke`
- `/verstappen-info`
- `/verstappen-quote`
- `/verstappen-season`

And enable sockets

## Environment Variables

| Variable | Description |
|---|---|
| `SLACK_BOT_TOKEN` | Bot token from your Slack app (starts with `xoxb-`) |
| `SLACK_SIGNING_SECRET` | Signing secret from your Slack app settings |
