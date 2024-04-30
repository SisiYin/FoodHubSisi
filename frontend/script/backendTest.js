import {
  renderingTrending,
  renderingMyPosts,
} from "./modules/renderingPosts.js";
import { posts } from "./modules/posts.js";
import {
  registration,
  login,
  addNewPost,
  logout,
  loginStatusIsValid,
  // showComments,
} from "./modules/eventHandling.js";

document.addEventListener("DOMContentLoaded", async () => {
  // const backendUrl = "https://food-hub-oamk.vercel.app/api";
  const backendUrl = `http://localhost:3001`;

  const localToken = localStorage.getItem("token");
  const account_id = await loginStatusIsValid(localToken, backendUrl);
  const trending = new posts(backendUrl, "/posts/trending");
  const myPosts = new posts(backendUrl, `/posts/account/${account_id}`);

  renderingTrending(trending);
  renderingMyPosts(myPosts);

  registration(backendUrl);
  login(backendUrl);
  addNewPost(backendUrl);
  // showComments();
  logout();
});
