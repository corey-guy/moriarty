const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

runSample();
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId the project to be used
 */
async function runSample(projectId = 'moriarty-upws') {
	//Unique ID for the session
	const sessionId = uuid.v4();

	//create new session
	const sessionClient = new dialogflow.SessionsClient();
	const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

	//the text query request
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				//the query to send to the agent
				text: "hello",
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
}