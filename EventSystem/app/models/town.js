// Towns model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TownSchema = new Schema({
  name: {type: String, index: { unique: true }}
});

mongoose.model('Town', TownSchema);
