// This file contains the code that handles the requests made to /post
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Post route to create new posts
router.post('/post', async (req, res) => { 
      const { title, sender, content} = req.body; 

      if ( !title || !sender || !content ) { 
          return res.status(400).json({ message: 'Title, Message and Content body params are required' }); 
      } 
      
      try { 
          const newPost = new Post({ title, sender, content }); 
          await newPost.save(); 

          res.status(201).json(newPost); 
      } catch (error) { 
          res.status(500).json({ message: `Error saving post ${error}`, error }); 
      } 
  });

// GET route made to fetch all posts
router.get('/posts', async (req, res) => {
    try {
      // Fetch all posts from the Post model
      const posts = await Post.find();
      
      // Return the posts as a JSON response
      res.status(200).json(posts);
    } catch (error) {
      // Handle any errors that occur during the fetch
      res.status(500).json({ message: 'Error fetching posts', error });
    }
  });

// GET route made to fetch all posts made by a sender by ID in query params
router.get('/post', async (req, res) => {
    const { sender } = req.query;  
    try {
      // Fetch all posts from the Post model by sender ID
      const post = await Post.find({ sender: sender });

      // Return the posts as a JSON response
      res.status(200).json(post);
    } catch (error) {
      // Handle any errors that occur during the fetch
      res.status(500).json({ message: 'Error fetching posts', error });
    }
  });

// GET route made to fetch all posts made by ID
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch all posts from the Post model by sender ID
    const posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the posts as a JSON response
    res.status(200).json(posts);
  } catch (error) {
    // Handle any errors that occur during the fetch
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});


// UPDATE route made to fetch all posts made by ID
router.put('/post/:id', async (req, res) => {
  try {
    // Update the post and return the updated document
    const post = await Post.findByIdAndUpdate(req.params.id,req.body);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
});

module.exports = router;
