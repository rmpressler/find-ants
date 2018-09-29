const Accounts = require('./api').Accounts;

module.exports = function (req, res, next) {
    const accountId = req.body.accountId;
    const transactions = req.body.transactions;

    const query = {
        _id: accountId
    };

    const update = {
        $push: {
            transactions: {
                $each: transactions
            }
        }
    };

    Accounts.findOneAndUpdate(query, update)
        .then(doc => res.json(doc));
};