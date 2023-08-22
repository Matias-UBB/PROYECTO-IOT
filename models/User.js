const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    nombre:{
        type: String,
        required: true,
    },
    apellido:{
        type: String,
        required: true,
    },
    rut:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    experimentos:{
        type: [{type: Schema.Types.ObjectId,
         ref: 'Experimento',
        }],
    },
    compartidoConmigo:{
        type: [{type: Schema.Types.ObjectId,
        ref: 'Experimento',
        }],
    },
    
});
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
