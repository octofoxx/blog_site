const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userSeeds.json');
const blogData = require('./blogSeeds.json');
const commentData = require('./commentSeeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const blog of blogData) {
      await Blog.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    const comments = await Comment.bulkCreate(commentData);
  
    process.exit(0);
  };
  
  seedDatabase();