const express = require('express');
const app = express();
const note = require('./../models/Note');

// Ver lista de notas
app.get('/note', (req, res) => {
    note.find({})
            .exec( (err, noteList) => {
                if(err){
                    return res.json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                }
                if(!noteList.length){
                    return res.json({
                        'success': false,
                        'message' : 'There is not notes created',
                    });
                }
                return res.json({
                    'success': true,
                    'message' : 'Welcome, Insert a title and a description for a new note. Note list:',
                    'data' : [noteList]
                })
            });
 });

 //ingresar nueva nota
app.post('/note', async (req, res) => {
    const {title, description} = req.body;
    const newNote = note({title, description});
    newNote.save((err, noteDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Note created successfully',
            'data' : [noteDB]
        })
    });
});

//consultar nota
app.get('/note/:id', function (req, res) {
    let id = req.params.id;

    note.findById(id)
            .exec( (err, noteDetail) => {
                if(err){
                    return res.status(400).json({
                        'success': false,
                        'message' : 'Note not found',
                        'data' : []
                    });
                }
                return res.json({
                    'success': true,
                    'message' : 'Note Detail',
                    'data' : [noteDetail]
                })
            });
});

//eliminar una nota
app.delete('/note/delete/:id', function (req, res) {
    let id = req.params.id;
    note.findByIdAndDelete(id, (err, noteDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        if(!noteDB){
            return res.json({
                'success': false,
                'message' : 'Note not found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Delete successfully',
            'data' : [noteDB]
        })
    });
});

//editar nota
app.put('/note/update/:id', function (req, res) {
    let id = req.params.id;
    let data = req.body;

    const { title, description } = data;

    // Captura solo el titulo y la descripcion, cualquier otra info es ignorada
    let actualizar = { title, description };

    note.findByIdAndUpdate(id, actualizar, {new : true,  runValidators: true}, (err, noteDb) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'La informacion se ha actualizado corretcamente',
            'data' : [noteDb]
        })
    });
});

module.exports = app;
