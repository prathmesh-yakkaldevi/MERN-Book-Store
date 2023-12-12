import express from "express";
import { Book } from "../models/bookmodels.js";

const router = express.Router();

router.post('/', async (req,res) => {
    try{
        if( !req.body.title || !req.body.author || !req.body.publishYear )
            return res.status(400).send({message: 'Send all requored field'});
        const newBook = {
            title : req.body.title,
            author: req.body.author,
            publishYear : req.body.publishYear,
        };
        const books = await Book.create(newBook);
        return res.status(200).send(books);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get('/', async (req,res)=>{
    try{
        const books = await Book.find({});
        return res.status(200).send({
            count: books.length,
            data:books
        });
    }catch(err){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            const error = new Error('Book not found');
            // error.statusCode = 404;
            throw error;
        }
            // return res.status(404).send({ message: "Book not found" });
        return res.status(200).send(book);
        
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.put('/:id', async(req, res)=>{
    try{
        // if( !req.body.title || !req.body.author || !req.body.publishYear )
        //     return res.status(400).send({message: 'Send all requored field'});
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message: "book not found"})
        }
        return res.status(200).send({message: "Book updated succesfully"})

    }catch{
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.delete('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result)
            return res.status(404).json({message: "Book not found"});
        return res.status(200).send({message: "Book Deleted successfully"});

    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

export default router;