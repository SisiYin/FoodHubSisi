const { query } = require("./database");
const moment = require("moment-timezone");

class Post {
  // Function to get all posts
  static async getAllPosts() {
    try {
      const queryText = "SELECT * FROM post";
      const posts = await query(queryText);
      posts.rows.forEach(async (post) => {
        await Post.updateCommentNum(post.post_id);
      });
      return posts.rows || [];
    } catch (err) {
      throw new Error(err.message);
    }
  }
  // Function to get a post by post_id
  static async getPostByPostId(post_id) {
    try {
      const queryText =
        "SELECT post.*, account.username FROM post join account on post.account_id = account.account_id WHERE post_id = $1";
      const post = await query(queryText, [post_id]);
      await Post.updateCommentNum(post_id);
      return post.rows[0] || null;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  // Function to get comments by post_id
  static async getCommentsByPostId(post_id) {
    try {
      const queryText = `SELECT comment.*, account.username, account.avatar FROM comment 
      join account on comment.account_id = account.account_id
      WHERE post_id = $1 ORDER BY date DESC`;
      const comments = await query(queryText, [post_id]);

      await Post.updateCommentNum(post_id);

      return comments.rows || [];
    } catch (err) {
      throw new Error(err.message);
    }
  }
  // Function to get all of posts by account_id
  static async getAllPostsByAccountId(account_id) {
    try {
      const queryText = `SELECT post.*, account.username FROM post 
      join account on post.account_id = account.account_id
      WHERE post.account_id = $1 order by date desc;`;
      const post = await query(queryText, [account_id]);
      await Post.updateCommentNum(post.post_id);
      return post.rows || null;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  // Function to get the latest post with photo by date
  static async getLatestPost() {
    try {
      const queryText =
        "SELECT * FROM post WHERE photo_data IS NOT NULL ORDER BY DATE DESC LIMIT 1;";
      const post = await query(queryText);
      await Post.updateCommentNum(post.post_id);
      return post.rows[0] || null;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  // Function to get Top 3 rated posts for trending collection
  static async getTrendingPosts() {
    try {
      const queryText = `SELECT post.*,account.username FROM post
      join account on post.account_id = account.account_id
      where post.comment_num >= 5 and photo_data IS NOT Null ORDER BY post.rate DESC LIMIT 3`;
      const posts = await query(queryText);
      posts.rows.forEach(async (post) => {
        await Post.updateCommentNum(post.post_id);
      });
      return posts.rows || [];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Function to get Top 3 following posts for following collection
  static async getFollowingPosts(account_id) {
    try {
      const queryText = `SELECT DISTINCT * FROM post
      WHERE account_id = ANY(SELECT unnest(following_id) FROM account WHERE account_id = $1)
      LIMIT 3;`;
      const posts = await query(queryText, [account_id]);
      posts.rows.forEach(async (post) => {
        await Post.updateCommentNum(post.post_id);
      });
      return posts.rows || [];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Function to search for posts by keyword
  static async getAllPostsBySearchingKeyword(keyword) {
    try {
      const queryText = `select account.account_id, account.username, account.avatar,
      post.post_id, post.title, post.description, post.category, 
      post.photo_data, post.rate, post.comment_num, post.date from account
      join post
      on account.account_id = post.account_id
      WHERE description ILIKE $1
      ORDER BY post.date DESC;`;
      const posts = await query(queryText, ["%" + keyword + "%"]);
      posts.rows.forEach(async (post) => {
        await Post.updateCommentNum(post.post_id);
      });
      return posts.rows || [];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Function to add a new post
  static async addNewPost(account_id, title, description, category, photoData) {
    try {
      const timestamp = moment().format();
      const queryText =
        "INSERT INTO post (account_id, title, description, category, photo_data, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const result = await query(queryText, [
        account_id,
        title,
        description,
        category,
        photoData,
        timestamp,
      ]);

      await Post.updateCommentNum(result.post_id);

      return result.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
  // Function to add a new comment
  static async addNewComment(post_id, account_id, comment) {
    try {
      const timestamp = moment().format();
      const queryText =
        "INSERT INTO comment (post_id, account_id, comment, date) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await query(queryText, [
        post_id,
        account_id,
        comment,
        timestamp,
      ]);
      await Post.updateCommentNum(post_id);
      return result.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
  // Function to add a new rate
  static async addNewRate(post_id, rate) {
    try {
      const queryText =
        "INSERT INTO star (post_id, rate) VALUES ($1, $2) RETURNING *";
      const result = await query(queryText, [post_id, rate]);
      return result.rows[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Function to update an existing post
  static async updatePost(post_id, newData) {
    try {
      const queryText = "UPDATE post SET description = $1 WHERE post_id = $2";
      await query(queryText, [newData.description, post_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Function to update the comment_num column in the post table
  static async updateCommentNum(post_id) {
    try {
      // Count the number of comments for the specified post_id
      const queryText =
        "SELECT COUNT(*) AS num_comments FROM comment WHERE post_id = $1";
      const result = await query(queryText, [post_id]);

      // Extract the number of comments from the result
      const numComments = result.rows[0].num_comments;

      // Update the comment_num column in the post table
      const updateQuery = "UPDATE post SET comment_num = $1 WHERE post_id = $2";
      await query(updateQuery, [numComments, post_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  // Function to delete a post
  static async deletePost(post_id) {
    try {
      const queryText = "DELETE FROM post WHERE post_id = $1";
      await query(queryText, [post_id]);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = Post;
