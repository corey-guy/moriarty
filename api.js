const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

runSample("Greetings");
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId the project to be used
 */
async function runSample(text) {
	console.log("Sample!!!");
	console.log(text);
	//Unique ID for the session
	const sessionId = uuid.v4();

	//create new session
	const sessionClient = new dialogflow.SessionsClient();
	const sessionPath = sessionClient.projectAgentSessionPath('moriarty-upws', sessionId);

	//the text query request
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				//the query to send to the agent
				//text: "hello",
				text: text,
				//the languaged used by the client
				languageCode: 'en-US',
			},
		},
	};

	//send request and log result
	const responses = await sessionClient.detectIntent(request);
	console.log('Detected intent');
	const result = responses[0].queryResult;
	console.log(`	Query: ${result.queryText}`);
	console.log(`	Response: ${result.fulfillmentText}`);
	if (result.intent) {
		console.log(`	Intent: ${result.intent.displayName}`);
	} else {
		console.log(`	No Intent matched.`);
	}

	return result;
}

module.exports = {runSample}