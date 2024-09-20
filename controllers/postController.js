const { Post, Like, User, Follow } = require('../models');

const postController = {
   createPost: async (req, res) => {
    // Log the incoming request body for debugging
    console.log('Request body:', req.body);
    
    // Extract userId from req.user set by the authMiddleware
    const userId = req.user.userId; 
    console.log(req.user.userId);
    const { heading, title, content } = req.body;

    try {
      // Handle missing or invalid data
      if (!heading || !title || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check if userId exists in the Users table
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      // Create the post
      const post = await Post.create({
        userId,
        heading,
        title,
        content,
        filePath: req.file ? req.file.path : null // Save file path if a file was uploaded
      });

      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'An error occurred while creating the post' });
    }
  },

  getAllPosts: async (req, res) => {
  try {
      console.log('Request body:', req.user);
    
    // Extract userId from req.user set by the authMiddleware
    const userId = req.user.userId; 
    // Step 1: Fetch the IDs of users the logged-in user is following
   const followedUsers = await Follow.findAll({
      attributes: ['followingId'],
      where: { followerId: userId }
    });

    const followedUserIds = followedUsers.map(follow => follow.followeeId);

    // Step 2: Fetch posts from the logged-in user and followed users
    const posts = await Post.findAll({
      where: {
        // Only fetch posts from the logged-in user and users they follow
        UserId: [userId, ...followedUserIds]
      },
      include: [
        { model: User }, // Include the user information for the posts
        { model: Like }  // Include the likes associated with the posts
      ],
      order: [['createdAt', 'DESC']], // Optionally, order posts by creation date
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
},


  likePost: async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;
    console.log({ postId, userId })
    try {
      // Check if user already liked the post
      const existingLike = await Like.findOne({ where: { postId, userId } });
      if (existingLike) {
        return res.status(400).json({ error: 'Post already liked' });
      }

      const like = await Like.create({ postId, userId });
      res.status(200).json(like);
    } catch (err) {
      res.status(500).json({ error: 'Failed to like post' });
    }
  },

    unlikePost: async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;

    try {
      // Check if the like exists
      const existingLike = await Like.findOne({ where: { postId, userId } });
      if (!existingLike) {
        return res.status(400).json({ error: 'Post not liked yet' });
      }

      // Delete the like
      await Like.destroy({ where: { postId, userId } });
      res.status(200).json({ message: 'Post unliked successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to unlike post' });
    }
  }


};

module.exports = postController;
