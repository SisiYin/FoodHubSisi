import { submitComment, jumpToPostDetailPage } from "./eventHandling.js";

export const renderingTrending = async (PostsObj) => {
  const postList = await PostsObj.getPosts();
  const trendingContainer = document.getElementById("trendingPostsContainer");
  trendingContainer.innerHTML = "";
  if (postList != null) {
    postList.forEach((post, index) => {
      const postItem = createTrendingItem(post, index === 0);
      trendingContainer.appendChild(postItem);
    });
  }
};

const createTrendingItem = (post, isActive) => {
  const postItem = document.createElement("div");
  postItem.className = isActive ? "carousel-item active" : "carousel-item";
  const photos = post.getPhotoData();
  // incase of no photo
  if (photos == null || photos.length === 0) {
    return postItem;
  }
  // rendering first photo only
  const photo = photos[0];

  const img = createImage(photo);
  postItem.appendChild(img);

  return postItem;
};

export const renderingFollowing = async (PostsObj) => {
  const postList = await PostsObj.getPosts();
  const trendingContainer = document.getElementById("followingPostsContainer");
  trendingContainer.innerHTML = "";
  if (postList != null) {
    postList.forEach((post, index) => {
      const postItem = createFollowingItem(post, index === 0);
      trendingContainer.appendChild(postItem);
    });
  }
};

const createFollowingItem = (post, isActive) => {
  const postItem = document.createElement("div");
  postItem.className = isActive ? "carousel-item active" : "carousel-item";
  const photos = post.getPhotoData();
  // incase of no photo
  if (photos == null || photos.length === 0) {
    return postItem;
  }
  // rendering first photo only
  const photo = photos[0];

  const img = createImage(photo);
  postItem.appendChild(img);

  return postItem;
};

// renderingMyPosts
export const renderingMyPosts = async (PostsObj, backendUrl) => {
  const postList = await PostsObj.getPosts();
  const myPostsContainer = document.getElementById("myPostsContainer");
  myPostsContainer.innerHTML = "";
  if (postList.length > 0) {
    postList.forEach((post, index) => {
      const postItem = createPostsItem(post, index);
      myPostsContainer.appendChild(postItem);
      submitComment(post, index, backendUrl);
    });
  } else {
    const noFoundItem = createNoFoundItem();
    searchResultContainer.appendChild(noFoundItem);
  }
  jumpToPostDetailPage();
};

// renderingSearchResult
export const renderingSearchResult = async (PostsObj, backendUrl) => {
  const postList = await PostsObj.getPosts();
  const searchResultContainer = document.getElementById(
    "searchResultContainer"
  );
  searchResultContainer.innerHTML = "";
  if (postList.length > 0) {
    postList.forEach((post, index) => {
      const postItem = createPostsItem(post, index);
      // const postContainer = document.createElement("div");
      // postContainer.className = "col-md-4 postContainer";
      // postContainer.id = `postContainer-${index}`;
      // postContainer.appendChild(postItem);
      searchResultContainer.appendChild(postItem);
      submitComment(post, index, backendUrl);
    });
  } else {
    const noFoundItem = createNoFoundItem();
    searchResultContainer.appendChild(noFoundItem);
  }
  jumpToPostDetailPage();
};

const createPostsItem = (post, index) => {
  // create card header
  const headerContainer = document.createElement("div");
  headerContainer.className = "card-header";
  // header row
  const headerRow = document.createElement("div");
  headerRow.className = "row d-flex justify-content-between align-items-center";
  // user avatar column
  const userAvatarColumn = document.createElement("div");
  userAvatarColumn.className = "col-1";
  // user name column
  const userNameColumn = document.createElement("div");
  userNameColumn.className = "col-6";
  // post time column
  const postTimeColumn = document.createElement("div");
  postTimeColumn.className = "col-auto ";
  // user avatar
  const userAvatar = document.createElement("img");
  userAvatar.className = "userAvatar img rounded-circle";
  userAvatar.src = "https://www.w3schools.com/howto/img_avatar.png";
  userAvatar.alt = "userAvatar";
  userAvatar.style.width = "30px";
  userAvatar.style.height = "30px";
  // user name
  const userName = document.createElement("span");
  userName.className = "card-text";
  userName.id = "userName";
  userName.textContent = post.getUsername();
  // post time
  const postTime = document.createElement("small");
  postTime.className = "card-text";
  postTime.textContent = post.getDate();
  // append to header row
  userAvatarColumn.appendChild(userAvatar);
  userNameColumn.appendChild(userName);
  postTimeColumn.appendChild(postTime);
  headerRow.appendChild(userAvatarColumn);
  headerRow.appendChild(userNameColumn);
  headerRow.appendChild(postTimeColumn);
  headerContainer.appendChild(headerRow);

  // create card body
  const bodyContainer = document.createElement("div");
  bodyContainer.className = "card-body";
  const description = document.createElement("p");
  description.className = "card-text description";
  description.textContent = post.getDescription();
  // append to card body
  bodyContainer.appendChild(description);

  // create category row
  // const categoryContainer = document.createElement("div");
  // categoryContainer.className = "card-body";
  // const categoryRow = document.createElement("div");
  // categoryRow.className = "row";
  // const categoryColumn = document.createElement("div");
  // categoryColumn.className = "col";

  if (post.getCategory() != null) {
    post.getCategory().forEach((category) => {
      const badge = document.createElement("span");
      badge.className = "badge bg-success me-1";
      badge.textContent = category;
      bodyContainer.appendChild(badge);
    });
  }

  // categoryRow.appendChild(categoryColumn);
  // categoryContainer.appendChild(categoryRow);

  // create card footer
  const footerContainer = document.createElement("div");
  footerContainer.className = "card-footer text-muted";
  // footer row
  const footerRow = document.createElement("div");
  footerRow.className = "row";
  // comments column
  const commentsColumn = document.createElement("div");
  commentsColumn.className = "col-auto d-flex align-items-center";
  commentsColumn.id = `commentsColumn-${index}`;
  commentsColumn.setAttribute("data-bs-toggle", "collapse");
  commentsColumn.setAttribute("data-bs-target", `#collapseComments-${index}`);
  commentsColumn.setAttribute("aria-expanded", "false");
  commentsColumn.setAttribute("aria-controls", `collapseComments-${index}`);

  const commentsIcon = document.createElement("span");
  commentsIcon.className = "material-symbols-outlined";
  commentsIcon.textContent = " comment ";

  const commentsNum = document.createElement("span");
  commentsNum.className = "card-text m-2";
  commentsNum.id = "commentsNum";
  commentsNum.textContent = post.getCommentNum();

  const commentInputContainer = document.createElement("div");
  commentInputContainer.className = "my-3 mx-3";
  commentInputContainer.id = `commentInputContainer-${index}`;

  const commentForm = document.createElement("form");
  commentForm.id = `commentForm-${index}`;
  commentForm.className = "";

  const commentInput = document.createElement("textarea");
  commentInput.className = "form-control border border-2 border-dark";
  commentInput.rows = "3";
  commentInput.id = `commentInput-${index}`;
  commentInput.placeholder = "Add a comment...";

  const commentButton = document.createElement("button");
  commentButton.type = "button";
  commentButton.className = "btn btn-primary mt-2 float-end";
  commentButton.textContent = "Comment";
  commentButton.id = `commentButton-${index}`;

  commentForm.appendChild(commentInput);
  commentForm.appendChild(commentButton);
  commentInputContainer.appendChild(commentForm);

  // rate column part
  const rateColumn = document.createElement("div");
  rateColumn.className = "col-auto d-flex align-items-center";
  rateColumn.id = "rateColumn";

  const rateIcon = document.createElement("span");
  rateIcon.className = "material-symbols-outlined";
  rateIcon.textContent = " grade ";

  const rateNum = document.createElement("span");
  rateNum.className = "card-text m-2";
  rateNum.id = "rateNum";
  rateNum.textContent = post.getRate();

  // append to card footer
  commentsColumn.appendChild(commentsIcon);
  commentsColumn.appendChild(commentsNum);

  rateColumn.appendChild(rateIcon);
  rateColumn.appendChild(rateNum);

  footerRow.appendChild(commentsColumn);
  footerRow.appendChild(rateColumn);

  footerContainer.appendChild(footerRow);

  // comments body
  const commentsBody = document.createElement("div");
  commentsBody.className = "collapse";
  commentsBody.id = `collapseComments-${index}`;
  const commentsList = document.createElement("div");
  commentsList.className = "card card-body border-0";
  commentsList.id = `commentsList-${index}`;
  const comments = post.getComments();
  if (comments.length > 0) {
    comments.forEach((comment, index) => {
      const commentItem = document.createElement("div");
      commentItem.className =
        "commentItem border-bottom border-bottom-5 border-black";
      commentItem.id = `commentItem-${index}`;

      const commentRow = document.createElement("div");
      commentRow.className =
        "row d-flex justify-content-between align-items-center my-2";
      // user avatar column
      const userAvatarColumn = document.createElement("div");
      userAvatarColumn.className = "col-1";
      // user name column
      const userNameColumn = document.createElement("div");
      userNameColumn.className = "col-6";
      // post time column
      const postTimeColumn = document.createElement("div");
      postTimeColumn.className = "col-auto";

      const commentTextColumn = document.createElement("div");
      commentTextColumn.className = "col-auto my-1";

      const userAvatar = document.createElement("img");
      userAvatar.className = "commentUserAvatar img rounded-circle";
      userAvatar.src = "https://www.w3schools.com/howto/img_avatar.png";
      userAvatar.alt = "userAvatar";
      userAvatar.style.width = "30px";
      userAvatar.style.height = "30px";

      const userName = document.createElement("span");
      userName.className = "commentUserName";
      userName.textContent = comment.getUsername();

      const postTime = document.createElement("small");
      postTime.className = "commentDate";
      postTime.textContent = comment.getDate();

      const commentText = document.createElement("span");
      commentText.className = "commentText";
      commentText.textContent = comment.getComment();

      userAvatarColumn.appendChild(userAvatar);
      userNameColumn.appendChild(userName);
      postTimeColumn.appendChild(postTime);
      commentTextColumn.appendChild(commentText);
      commentRow.appendChild(userAvatarColumn);
      commentRow.appendChild(userNameColumn);
      commentRow.appendChild(postTimeColumn);
      commentRow.appendChild(commentTextColumn);
      commentItem.appendChild(commentRow);
      commentsList.appendChild(commentItem);
    });
  } else {
    const noComments = createNoCommentItem();
    commentsList.appendChild(noComments);
  }
  commentsBody.appendChild(commentsList);
  commentsBody.appendChild(commentInputContainer);
  footerContainer.appendChild(commentsBody);

  // create card
  const postItem = document.createElement("div");
  const post_id = post.getPostId();
  postItem.className = `card border border-dark border-2 mb-3 postId:${post_id}`;
  postItem.id = `postItem-${index}`;
  postItem.appendChild(headerContainer);
  postItem.appendChild(bodyContainer);
  // postItem.appendChild(categoryContainer);
  postItem.appendChild(footerContainer);
  // get photo data
  const photos = post.getPhotoData();
  // incase of no photo
  if (photos == null) {
    return postItem;
  }
  // rendering first photo only
  const photo = photos[0];
  const img = createImage(photo);
  bodyContainer.appendChild(img);
  return postItem;
};

const createNoCommentItem = () => {
  // create card header
  const headerContainer = document.createElement("div");
  headerContainer.className = "card-header";
  // header row
  const headerRow = document.createElement("div");
  headerRow.className = "row d-flex justify-content-between align-items-center";
  const NoFoundText = document.createElement("span");
  NoFoundText.className = "card-text text-center";
  NoFoundText.textContent = `No Comments yet, be the first to comment!`;
  // append to header row
  headerRow.appendChild(NoFoundText);
  headerContainer.appendChild(headerRow);
  const postItem = document.createElement("div");
  postItem.className = "card border-0";
  postItem.appendChild(headerContainer);
  return postItem;
};

const createNoFoundItem = () => {
  // create card header
  const headerContainer = document.createElement("div");
  headerContainer.className = "card-header";
  // header row
  const headerRow = document.createElement("div");
  headerRow.className =
    "row  d-flex justify-content-between align-items-center";
  const NoFoundText = document.createElement("span");
  NoFoundText.className = "card-text text-center";
  NoFoundText.textContent = "No post found";
  // append to header row
  headerRow.appendChild(NoFoundText);
  headerContainer.appendChild(headerRow);
  const postItem = document.createElement("div");
  postItem.className = "card border border-2 border-dark rounded-3";
  postItem.appendChild(headerContainer);
  return postItem;
};

export const createImage = (photo) => {
  const photoData = photo.data;
  const uint8Array = new Uint8Array(photoData);
  const blob = new Blob([uint8Array], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  const img = document.createElement("img");
  img.src = url;
  img.alt = "photo";
  img.className = "img-fluid rounded-3 border border-black border-2";
  img.style.height = "200px";
  img.style.width = "100%";
  return img;
};
