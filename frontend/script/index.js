import {
  renderingTrending,
  renderingFollowing,
  renderingMyPosts,
} from "./modules/renderingPosts.js";
import { Posts } from "./modules/posts.js";
import { renderingAvatar } from "./modules/renderingUser.js";
import {
  registration,
  login,
  addNewPost,
  logout,
  loginStatusIsValid,
  jumpToTrendingPage,
  jumpToFollowingPage,
  jumpToSearchResult,
  hideFollowingCollection,
  // showComments,
} from "./modules/eventHandling.js";

const backendUrl = `http://localhost:3001`;

document.addEventListener("DOMContentLoaded", async () => {
  // toggleCategoryButton();

  const localToken = localStorage.getItem("token");
  const userData = localStorage.getItem("userData");
  const trending = new Posts(backendUrl, "/posts/trending");

  renderingTrending(trending);
  registration(backendUrl);
  login(backendUrl);
  loginStatusIsValid(localToken, backendUrl);
  hideFollowingCollection(userData);

  jumpToTrendingPage();
  jumpToFollowingPage();
  jumpToSearchResult();
  logout();

  if (userData) {
    const userDataObj = JSON.parse(userData);
    const account_id = userDataObj.account_id;
    const following = new Posts(backendUrl, `/posts/following/${account_id}`);
    renderingFollowing(following);
  }
});
