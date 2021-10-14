// let handler = require('../index');
import handler = require('../index');
import { StockCheck } from '../models/stock-check.model';

// let e = '{ "Records": [{ "eventVersion": "2.0", "eventSource": "aws:s3", "awsRegion": "eu-central-1", "eventTime": "1970-01-01T00:00:00.000Z", "eventName": "ObjectCreated:Put", "userIdentity": { "principalId": "AIDAJDPLRKLG7UEXAMPLE" }, "requestParameters": { "sourceIPAddress": "127.0.0.1" }, "responseElements": { "x-amz-request-id": "C3D13FE58DE4C810", "x-amz-id-2": "FMyUVURIY8/IgAtTv8xRjskZQpcIZ9KG4V5Wp6S7S/JRWeUWerMUE5JgHvANOjpD" }, "s3": { "s3SchemaVersion": "1.0", "configurationId": "testConfigRule", "bucket": { "name": "my-bucket", "ownerIdentity": { "principalId": "A3NL1KOZZKExample" }, "arn": "arn:aws:s3:::my-bucket" }, "object": { "key": "HelloWorld.jpg", "size": 1024, "eTag": "d41d8cd98f00b204e9800998ecf8427e", "versionId": "096fKKXTRTtl3on89fVO.nfljtsv6qko" } } }] }';

let e = '{ "Records": [{ "messageId": "5180888f-2081-4631-b829-534179c3e548", "receiptHandle": "AQEB1Jjs2U+ayeWEAtc3TCE6M5gvWvKl666Uynp7TjFyBeCQwejn2JN2ViacvBf5jDYFpYYmHJMRJxEpaewRcPUg5chjBEOyTf9DW+29llbYqLN0jswgclmwwMXoOKuFIkjSyaV77g0f8Ovw+zvnSNx+CVAxDpljS72+npvbP/kZwlz3t7aX2SPqwnhmREridQTzLEs2nojVqFYjNZoz1OQ59cIZHJy+4PIFNml+8paaFyttoJoK1hqUFakBwoSr8Swb8BEWuoRJ/O19gvvXVqwx/uCfXrdMjMFM+trRc1NykgD13a6RiZdbjz8tKt9HQBn8dvgeVCgbtTXx718hhjZwCH/7SL33MWRFLB3Hrb9QPRdOnWdWVGKam2stok78B2J5", "body": "test", "attributes": { "ApproximateReceiveCount": "1", "SentTimestamp": "1634151823564", "SenderId": "235793719583", "ApproximateFirstReceiveTimestamp": "1634151823576" }, "messageAttributes": {}, "md5OfBody": "098f6bcd4621d373cade4e832627b4f6", "eventSource": "aws:sqs", "eventSourceARN": "arn:aws:sqs:us-east-1:235793719583:message-q", "awsRegion": "us-east-1" }] }';
let j = JSON.parse(e);
let a: Array<any> = j.Records;

let stockReq: StockCheck = new StockCheck();
stockReq.skus = '15463567|15166285|15078017|15530046|15463568|15530045|14969729|15318940|14954116|15229237|10416248|15309513|15084753|15546964|15147122|15309514|15373182|15524485|15493494|14954117|15317226|15547752|15201199|15201201'.split('|');
stockReq.locations = '910|544|795|916|954|207|926|622|932|57|200|202|938|233|927|617|990|930|237|203|62|956|977|931|245|615|965|937|943|985|949|942|631'.split('|');
stockReq.postalCd = 'L6R1Z8';

a[0].body = stockReq;

j.Records = [...a];

console.log(JSON.stringify(j));

handler.Handler.prototype.handle(j, {});

// .handle(j, {});