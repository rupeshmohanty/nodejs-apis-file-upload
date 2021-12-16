const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get all the ninjas from the db!
router.get("/ninjas",(req,res) => {
    Ninja.find({})
    .then((ninjas) => {
        res.json({
            status: true,
            response: 'All ninjas fetched!',
            listOfNinjas: ninjas
        })
    })
    .catch(err => res.status(422).send({error: err.message}));
})

router.post('/add-ninja',(req,res) => {
    const { name,rank,available } = req.body;

    if(req.files) {
        var file = req.files.photo;
        var filename = file.name;

        file.mv('./uploads/'+filename,(err) => {
            if(err) {
                res.send({error: err.message})
            } else {
                const ninja = new Ninja({
                    name,
                    rank,
                    available,
                    photo: filename
                });
            
                ninja.save()
                .then(() => {
                    res.json({
                        status: true,
                        response: 'Ninja added!',
                        details: ninja
                    })
                })
                .catch((err) => res.status(422).send({error: err.message}));           
            }
        })
    }
})

router.put("/ninjas/:id",(req,res) => {
    Ninja.findByIdAndUpdate({_id: req.params.id},req.body)
    .then(() => {
        Ninja.findOne({_id: req.params.id})
        .then((ninja) => {
            res.json({
                status: true,
                response: 'Ninja details updated!',
                details: ninja
            })
        })
        .catch(err => res.status(422).send({error: err.message}));
    })
    .catch(err => res.status(422).send({error: err.message}));

})

router.delete("/ninjas/:id",(req,res) => {
    Ninja.findByIdAndRemove({_id: req.params.id})
    .then(() => {
        res.json({
            status: true,
            response: 'Ninja deleted!'
        })
    })
    .catch(err => res.status(422).send({error: err.message}));
})

module.exports = router;