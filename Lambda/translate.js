const Translate = require("aws-sdk/clients/translate");

const client = new Translate({ region: "us-east-2" });

exports.handler = async (event) => {
  const params = {
    SourceLanguageCode: "auto",
    TargetLanguageCode: "es",
    Text: event.text,
  };

  return await client.translateText(params).promise();
};
