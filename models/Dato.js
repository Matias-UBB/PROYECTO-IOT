const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const datosSchema = new Schema({
    experimento:{
        // referencia al modelo experimento
        type: Schema.Types.ObjectId,
        ref: 'Experimento',
        required: true,
    },
    user:{
        // referencia al modelo user
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    valor:{
        type: Number,
        required: true,
    },
    type:{
        type: String,
    }
});
module.exports = mongoose.models.Dato || mongoose.model("Dato", datosSchema);
