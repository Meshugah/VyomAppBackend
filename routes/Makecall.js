const plivo = require('plivo');

function plivoCall() {
    'use strict';

    const client = new plivo.Client("MAMGQWODQWMDG5ZTNMYZ","ODFmNzdiYjJmYTcyMzgwZjdmMmVhN2I0ZmFiNTE4");
    client.calls.create(
        "+918668189883", // from
        "+918668189883", // to
        "http://s3.amazonaws.com/static.plivo.com/answer.xml", // answer url
        {
            answerMethod: "GET",
        },
    ).then(function (response) {
        console.log(response);
    }, function (err) {
        console.error(err);
    });
};

module.exports = plivoCall;
