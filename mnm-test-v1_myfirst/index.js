const path = require('path');
const restify = require('restify');
const { BotFrameworkAdapter, ConversationState, MemoryStorage } = require('botbuilder');
const { BotConfiguration } = require('botframework-config');
const { EchoBot } = require('./bot');
const ENV_FILE = path.join(__dirname, '.env');
const env = require('dotenv').config({ path: ENV_FILE });

const BOT_FILE = path.join(__dirname, (process.env.botFilePath || ''));
let botConfig;
var request = require('request');
const axios = require('axios')

try {
    botConfig = BotConfiguration.loadSync(BOT_FILE, process.env.botFileSecret);
} catch (err) {
    console.error(`\nError reading bot file. Please ensure you have valid botFilePath and botFileSecret set for your environment.`);
    console.error(`\n - You can find the botFilePath and botFileSecret in the Azure App Service application settings.`);
    console.error(`\n - If you are running this bot locally, consider adding a .env file with botFilePath and botFileSecret.`);
    console.error(`\n - See https://aka.ms/about-bot-file to learn more about .bot file its use and bot configuration.\n\n`);
    process.exit();
}

const DEV_ENVIRONMENT = 'development';
const BOT_CONFIGURATION = (process.env.NODE_ENV || DEV_ENVIRONMENT);
const endpointConfig = botConfig.findServiceByNameOrId(BOT_CONFIGURATION);

// See https://aka.ms/about-bot-adapter to learn more about bot adapter.
const adapter = new BotFrameworkAdapter({
    appId: endpointConfig.appId || process.env.microsoftAppID,
    appPassword: endpointConfig.appPassword || process.env.microsoftAppPassword,
    channelService: process.env.ChannelService,
    openIdMetadata: process.env.BotOpenIdMetadata
});

adapter.onTurnError = async (context, error) => {
    console.error(`\n [onTurnError]: ${error}`);
    await context.sendActivity(`Oops. Something went wrong!`);
    await conversationState.clear(context);
    await conversationState.saveChanges(context);
};

// Define a state store for your bot. See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
let conversationState;

const memoryStorage = new MemoryStorage();
conversationState = new ConversationState(memoryStorage);
const bot = new EchoBot(conversationState);

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`\n${server.name} listening to ${server.url}`);
});

server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // await bot.onTurn(context);
        await getAnswer(context);
    });
});

const getAnswer = async (turnContext) => {
    const knowledgeBaseTopic = turnContext.activity.text;

    await axios.post('http://localhost:3000/getAnswer', {
        "query":knowledgeBaseTopic
    })
        .then((res) => {
            console.log(res.data)
           
            return turnContext.sendActivity(res.data);
        })
        .catch((error) => {
            console.error(error)
        })


};
