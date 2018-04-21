var mongoose = require('mongoose');
mongoose.connect('mongodb://findinator:S1290f7992@ds019766.mlab.com:19766/find-ants');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log('Established MongoDB connection.');
});

var BillSchema = mongoose.Schema({
    name:           String,
    dayOfMonth:     Number,
    amount:         Number
});

var TransactionSchema = mongoose.Schema({
    date:           Date,
    description:    String,
    amount:         Number,
    location:       String
});

var AccountSchema = mongoose.Schema({
    name:           String,
    transactions:   [TransactionSchema]
});

var CSVSettingsSchema = mongoose.Schema({
    columnAssignments:  [Number],
    hasHeaderRow:       Boolean,
    locationFilters:    [String]
});

var UserSchema = mongoose.Schema({
    username:       String,
    password:       String,
    bills:          [BillSchema],
    accounts:       [mongoose.Schema.ObjectId],
    csvSettings:    CSVSettingsSchema
});

var Users = mongoose.model('Users', UserSchema);
var Accounts = mongoose.model('Accounts', AccountSchema);

(function(exports) {
    exports.create = create;
    exports.read = read;
    exports.update = update;

    var tableToSchema = {
        users: Users,
        accounts: Accounts
    };

    function create(req, res) {
        var table = req.params.table;
        var object = req.body;

        var dataObject = new tableToSchema[table](object);
        dataObject.save(getResponseHandler(res));
    }

    function read(req, res) {
        var table = req.params.table;
        var query = JSON.parse(req.query.query);

        tableToSchema[table].find(query, getResponseHandler(res));
    }

    function update(req, res) {
        var table = req.params.table;
        var updateObject = req.body;
        var query = {_id: updateObject._id};

        tableToSchema[table].findOne(query, updateOne);

        function updateOne(err, obj) {
            var field;

            if (err) {
                return res.json({});
            }

            for (field in updateObject) {
                if (updateObject.hasOwnProperty(field)) {
                    obj[field] = updateObject[field];
                }
            }

            obj.save(getResponseHandler(res));
        }
    }

    function getResponseHandler(response) {
        return function(err, storedObject) {
            if (err) {
                return response.json(err);
            }

            return response.json(storedObject);
        };
    }
})(exports);
