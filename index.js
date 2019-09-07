'use strict';
var AWS = require('aws-sdk');
var sns = new AWS.SNS();

exports.handler = (event, context, callback) => {
	var accountId = JSON.stringify(context.invokedFunctionArn).split(':')[4];
	var topicArn = 'arn:aws:sns:' + process.env.AWS_REGION + ':' + accountId + ':' + process.env.TOPIC_NAME;

	event.Records.forEach((record) => {
		console.log('Stream record: ', JSON.stringify(record, null, 2));

		if (record.eventName == 'INSERT') {
			var what = JSON.stringify(record.dynamodb.NewImage);
			var params = {
				Subject: 'A new insertion in database table',
				Message: what,
				TopicArn: topicArn
			};
			sns.publish(params, function(err, data) {
				if (err) {
					console.error('Unable to send message. Error JSON:', JSON.stringify(err, null, 2));
				} else {
					console.log('Results from sending message: ', JSON.stringify(data, null, 2));
				}
			});
		}
	});
	callback(null, `Successfully processed ${event.Records.length} records.`);
};
