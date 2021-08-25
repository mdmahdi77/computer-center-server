const Post = require('../models/post')
const slugify = require('slugify')


// Create new post
exports.create =  (req, res) => {

    const { title, content, price, user, image } = req.body
    const slug = slugify(title)

    // validate
    switch(true) {
        case !title:
          return res.status(400).json({ error: 'Title is required'})
          break;
        case !content:
            return res.status(400).json({ error: 'Content is required'})
          break;
      }

    // create post
    Post.create({ title, content, price, user, slug, image }, (err, post) => {
        if(err){
            console.log(err)
            res.status(404).json({ error: 'Duplicate post. Try another title'})
        }
        res.status(200).json({
          success: true,
          post
        })
    })
   
  }


  // Get all post
  exports.postList = async (req, res) => {

    const posts = await Post.find().sort({createdAt: -1})

    if(!posts){
      res.status(404).json({ error: 'Post not found'})
    }else{
      res.status(200).json({
        success: true,
        postCount: posts.length,
        posts
      })
    }
    
  }

  // Get single post by slug
  exports.read = async (req, res) => {

    const { slug } = req.params

    const post = await Post.findOne({ slug })

    if(!post){
      res.status(404).json({ error: 'Post details not found'})
    }else{
      res.status(200).json({
        success: true,
        post
      })
    }
    
  }

  // Update post
  exports.updatePost = async (req, res) => {

    const { slug } = req.params
    const { title, content, price, user, image} = req.body

    const post = await Post.findOneAndUpdate({ slug }, { title, content, price, user, slug, image}, { new: true, useFindAndModify: true })

    if(!post){
      res.status(404).json({ error: 'Post not updated'})
    }else{
      res.status(200).json({
        success: true,
        message: 'Post updated successfully',
        post
      })
    }

  }

  // Delete post
  exports.removePost = async (req, res) => {

    const { slug } = req.params

    const post = await Post.findOneAndRemove({ slug })

    if(!post){
      res.status(404).json({ error: 'Post not delete'})
    }else{
      res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
        post
      })
    }

  }