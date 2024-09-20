const { Follow, User } = require('../models');

const userController = {
  followUser: async (req, res) => {
    const { followId } = req.params;
    const followerId = req.user.userId;

    try {
      // Check if already following
      const isFollowing = await Follow.findOne({ where: { followerId, followingId: followId } });
      if (isFollowing) {
        return res.status(400).json({ error: 'Already following this user' });
      }

      const follow = await Follow.create({ followerId, followingId: followId });
      res.status(200).json(follow);
    } catch (err) {
      res.status(500).json({ error: 'Failed to follow user' });
    }
  }
};

module.exports = userController;
