const { Post } = require("../models/index");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a post by post id
const getPostByPostId = async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const post = await Post.getPostByPostId(post_id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get comments by post id
const getCommentsByPostId = async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const comments = await Post.getCommentsByPostId(post_id);
    if (!comments) {
      res.status(404).json({ error: "No comment for this post" });
      return;
    }
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get all of posts by account_id
const getAllPostsByAccountId = async (req, res) => {
  const account_id = req.params.account_id;
  try {
    const post = await Post.getAllPostsByAccountId(account_id);
    if (!post) {
      res.status(404).json({ error: "No post for this account" });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get the latest post
const getLatestPost = async (req, res) => {
  try {
    const post = await Post.getLatestPost();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get Top 3 rated posts for trending collection
const getTrendingPosts = async (req, res) => {
  try {
    const posts = await Post.getTrendingPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to get Top 3 following posts for following collection
const getFollowingPosts = async (req, res) => {
  const account_id = req.params.account_id;
  try {
    const posts = await Post.getFollowingPosts(account_id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to search for posts by keyword
const getAllPostsBySearchingKeyword = async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const posts = await Post.getAllPostsBySearchingKeyword(keyword);
    if (!posts) {
      res.status(404).json({ error: "No post found" });
      return;
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new post
const addNewPost = async (req, res) => {
  const { account_id, title, description, category } = req.body;
  console.log(category);
  try {
    const photoData =
      req.files.length > 0 ? req.files.map((file) => file.buffer) : null;

    if (description == "") {
      return res.status(400).send("Description is required");
    }
    const newPost = await Post.addNewPost(
      account_id,
      title,
      description,
      category,
      photoData
    );
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// add a new comment
const addNewComment = async (req, res) => {
  const post_id = req.params.post_id;
  const { account_id, comment } = req.body;
  try {
    if (comment == "") {
      return res.status(400).send("Comment is required");
    }
    const newComment = await Post.addNewComment(post_id, account_id, comment);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Function to add a new rate
const addNewRate = async (req, res) => {
  const { post_id, rate } = req.body;
  try {
    const newRate = await Post.addNewRate(post_id, rate);
    res.status(201).json(newRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update a post by id
const updatePostById = async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const newData = req.body;
    await Post.updatePost(post_id, newData);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post by id
const deletePostById = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    await Post.deletePost(post_id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPosts,
  getPostByPostId,
  getCommentsByPostId,
  getAllPostsByAccountId,
  getLatestPost,
  getTrendingPosts,
  getFollowingPosts,
  addNewPost,
  addNewComment,
  addNewRate,
  getAllPostsBySearchingKeyword,
  updatePostById,
  deletePostById,
};
