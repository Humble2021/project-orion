/*jshint esversion: 9 */
/*jshint -W018 */
/*jshint -W069 */
/*jshint -W083 */
/*jshint -W088 */
/*jshint -W038 */;

var utils = require("../utils");

module.exports = function (defaultFuncs, api, ctx) {
    return function markAsDelivered(threadID, messageID, callback) {
        var resolveFunc = function () {};
        var rejectFunc = function () {};
        var returnPromise = new Promise(function (resolve, reject) {
            resolveFunc = resolve;
            rejectFunc = reject;
        });

        if (!callback) {
            callback = function (err, friendList) {
                if (err) {
                    return rejectFunc(err);
                }
                resolveFunc(friendList);
            };
        }

        if (!threadID || !messageID) {
            return callback("Error: messageID or threadID is not defined");
        }

        var form = {};

        form["message_ids[0]"] = messageID;
        form["thread_ids[" + threadID + "][0]"] = messageID;

        defaultFuncs
            .post("https://www.facebook.com/ajax/mercury/delivery_receipts.php", ctx.jar, form)
            .then(utils.saveCookies(ctx.jar))
            .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
            .then(function (resData) {
                if (resData.error) {
                    throw resData;
                }

                return callback();
            })
            .catch(function (err) {
                if (utils.getType(err) == "Object" && err.error === "Not logged in.") {
                    ctx.loggedIn = false;
                }
                return callback(err);
            });

        return returnPromise;
    };
};
