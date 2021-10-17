const Translate = require('aws-sdk/clients/translate');

require('dotenv').config();
const {
  TRANSLATE_REGION,
  TRANSLATE_ACCESS_KEY_ID,
  TRANSLATE_SECRET_ACCESS_KEY,
} = process.env;

const client = new Translate({
  region: TRANSLATE_REGION,
  accessKeyId: TRANSLATE_ACCESS_KEY_ID,
  secretAccessKey: TRANSLATE_SECRET_ACCESS_KEY,
});

const translateText = async (text) => {
  const params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: 'es',
    Text: text,
  };

  return await client.translateText(params).promise();
};

module.exports = { translateText };
