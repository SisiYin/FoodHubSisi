import { Posts } from "./modules/posts.js";
import { Comments } from "./modules/comments.js";
import { renderingSearchResult } from "./modules/renderingPosts.js";
import {
  registration,
  login,
  logout,
  loginStatusIsValid,
  jumpToSearchResult,
  submitComment,
} from "./modules/eventHandling.js";

const backendUrl = `http://localhost:3001`;

document.addEventListener("DOMContentLoaded", async () => {
  const localToken = localStorage.getItem("token");
  const searchParams = new URLSearchParams(window.location.search);
  const keyword = searchParams.get("keyword");
  const searchResult = new Posts(backendUrl, `/posts/search/${keyword}`);

  jumpToSearchResult();
  renderingSearchResult(searchResult, backendUrl);
  loginStatusIsValid(localToken, backendUrl);
  registration(backendUrl);
  login(backendUrl);
  logout();
});
