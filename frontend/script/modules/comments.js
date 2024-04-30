import { Comment } from "./comment.js";

class Comments {
  #comments = [];
  #backendUrl = "";
  #restUrl = "";

  constructor(url, restUrl) {
    this.#backendUrl = url;
    this.#restUrl = restUrl;
  }

  getComments = async () => {
    try {
      const response = await fetch(`${this.#backendUrl}${this.#restUrl}`);
      if (response.ok) {
        const json = await response.json();
        this.#readJson(json);
        return this.#comments;
      } else {
        throw new Error("Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  #readJson = (json) => {
    this.#comments = json.map(
      (comment) =>
        new Comment(
          comment.comment_id,
          comment.account_id,
          comment.post_id,
          comment.comment,
          comment.date,
          comment.username,
          comment.avatar
        )
    );
  };
}

export { Comments };
