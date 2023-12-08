const axios = require('axios');
const returnRes = require("../utilities/responseHandler");
let res

let smsSender = async (otp, mobile) => {
    const options = {
        method: 'POST',
        url: 'https://control.msg91.com/api/v5/flow/',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authkey: '407783AtnBofQFu652979d4P1'
        },
        data: {
            "template_id": "65297bb6d6fc051ddc162922",
            "short_url": "1",
            "recipients": [
                {
                    "mobiles": `91${mobile}`,
                    "var": otp
                }
            ]
        }
    };

    await axios
        .request(options)
        .then(async function (response) {
            console.log(response.data);
            // if (response.data) {
            res = {
                status: true,
                message: response.data
            }
            // }
        })
        .catch(function (error) {
            res = {
                status: false,
                message: response.data
            }
        });
    return res
};

module.exports = smsSender;
