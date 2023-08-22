const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const experimentoSchema = new Schema({
    nombre:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: false,
    },
    fecha_inicio:{
        type: Date,
        required: true,
    },
    fecha_termino:{
        type: Date,
        required: false,
    },
    estado:{
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo',
    },
    compartidoConusuarios:{
        type: [{type: Schema.Types.ObjectId,
        ref: 'User',
        }],
    },
});

module.exports = mongoose.models.Experimento || mongoose.model("Experimento", experimentoSchema);