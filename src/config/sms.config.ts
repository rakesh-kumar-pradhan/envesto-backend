const unirest = require("unirest");
const req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

// const options = {API_KEY: "IEwhKzZ8Um4R7t5xnSFolaW1vj3Jq9gYPLds2DHNbQXkGAuOCcrjLOMDV7ae4bJ2dwqpTYXcm31PfzxZ"};

// fast2sms.init(options);
req.query({})

// export default fast2sms;

