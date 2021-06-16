const express = require('express');
const router = express.Router();
const auth = require ('../middlewares/auth');

const PostModel = require('../models/postModel');

router.get('/post', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostModel.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/post',auth , async (req, res) => {
    const post = req.body;

    const newPostModel = new PostModel(post);

    try {
        await newPostModel.save();

        res.status(201).json(newPostModel );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch('/post/:id' ,auth, async (req, res) => {

    try{
        const _id = req.params.id;
        const post = await PostModel.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });

        res.send(post)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/post/:id' ,auth, async (req, res) => {
    
    try{
        const _id = req.params.id;
        const post = await PostModel.findByIdAndRemove(_id);
        res.send(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;