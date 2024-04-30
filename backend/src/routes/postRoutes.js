const express = require("express");
const router = express.Router();
const { postController } = require("../controllers/index");
const { authMiddleware, multerMiddleware } = require("../middleware/index");

router.get("/search/:keyword", postController.getAllPostsBySearchingKeyword);
router.get("/following/:account_id", postController.getFollowingPosts);
router.get("/trending", postController.getTrendingPosts);
router.get("/latest", postController.getLatestPost);
router.get("/:post_id", postController.getPostByPostId);
router.get("/:post_id/comments", postController.getCommentsByPostId);
router.get("/account/:account_id", postController.getAllPostsByAccountId);
router.get("/", postController.getAllPosts);

router.post(
  "/new",
  authMiddleware.authenticateToken,
  multerMiddleware.upload,
  postController.addNewPost
);

router.post("/newRate", postController.addNewRate);

router.post(
  "/:post_id/comments",
  authMiddleware.authenticateToken,
  postController.addNewComment
);

router.put(
  "/:post_id",
  authMiddleware.authenticateToken,
  postController.updatePostById
);
router.delete(
  "/:post_id",
  authMiddleware.authenticateToken,
  postController.deletePostById
);

// Exporting the router object to the router/index.js
module.exports = router;
