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
  jumpToPostDetailPage,
  // showComments,
  // openAddPostModal,
} from "./modules/eventHandling.js";

const backendUrl = `http://localhost:3001`;

document.addEventListener("DOMContentLoaded", async () => {
  const localToken = localStorage.getItem("token");
  const userData = localStorage.getItem("userData");

  registration(backendUrl);
  login(backendUrl);
  loginStatusIsValid(localToken, backendUrl);
  jumpToSearchResult();
  logout();

  if (userData) {
    const userDataObj = JSON.parse(userData);
    const account_id = userDataObj.account_id;
    const myPosts = new Posts(backendUrl, `/posts/account/${account_id}`);
    renderingMyPosts(myPosts, backendUrl);
  }
  addNewPost(backendUrl);
});
