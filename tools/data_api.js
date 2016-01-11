///**
// * Created by Omri on 03/01/2016.
// */
//
function mongo_init(mongoose, url){
    //mongoose.connect('mongodb://localhost:27017/test');
    mongoose.connect(url);

    var db = mongoose.connection;
    db.on('error', function (err) {
        console.log('mongo got a connection error', err);
    });
    db.once('open', function () {
        console.log('mongo is connected.');
    });

    //define schema for data - Schema types: http://mongoosejs.com/docs/schematypes.html
    var Schema = mongoose.Schema;
    var formSchema = new Schema({
        agent : String,
        apt_status : String,
        apt_number : Number,
        balcony : String,
        city : String,
        contract : String,
        email : String,
        floor_number : Number,
        date : Date,
        opentext : String,
        front_back : String,
        furnished : String,
        house_number : Number,
        parking : String,
        partners : String,
        percentage_rise: Number,
        price : Number,
        room_number : Number,
        size : Number,
        split : String,
        street : String,
        years_since : String,
        doc_updated: Date,
        doc_created:  { type: Date, default: Date.now }
    }, {collection : 'forms'});

// TODO: for coordinates we can use
//var schema = new Schema({ loc: { type: String, coordinates: [Number] } });
// TODO check also schema.pre in http://blog.mongodirector.com/getting-started-with-mongodb-and-mongoose/
    var Form = mongoose.model('Form', formSchema);

    return [mongoose, db, Form];
}

function insert_doc(app_mongo, jsonObj) {
    mongoose = app_mongo[0];
    db = app_mongo[1];
    Form = app_mongo[2];

    //example for debuging:
    //var doc = new Form({
    //    first_name: 'omri',
    //    last_name: 'dod',
    //    city: 'dod city',
    //    house_number: 100,
    //    email: 'bar@dod.com',
    //    description: 'hi you',
    //    doc_updated: new Date()
    //});
    //
    //doc.save(function (err, data) {
    //    if (err) console.log(err);
    //    else console.log('Doc was saved to mongo: ', data);
    //})

    var Model_obj = mongoose.model('Form', Form);
    var document_obj = new Model_obj(jsonObj);
    document_obj.save(function(err,data){
        if (err) {
            console.log(err);
            console.log('Error in saving to mongo');
        }
        else {
            console.log('Doc was saved to mongo: ', data);
        }
    });
    return document_obj.id;
}

//define api functions:
var data_api = {
    spaces: null,
    mongo_init: mongo_init,
    insert_doc: insert_doc
};

module.exports = data_api;