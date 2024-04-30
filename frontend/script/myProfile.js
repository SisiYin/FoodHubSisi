// import { Posts } from "./modules/posts.js";
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


const backendUrl = "http://localhost:3001";

// const localToken = localStorage.getItem("token");
// const userData = localStorage.getItem("userData");
// const userDataObj = JSON.parse(userData);
// const account_id = userDataObj.account_id;

// const moreInf = document.getElementById("moreInf");

const createImage = (photoData) => {
  const uint8Array = new Uint8Array(photoData);
  const blob = new Blob([uint8Array], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  const img = document.createElement("img");
  img.src = url;
  img.alt = "photo";
  img.className = "mb-4 rounded-circle";
  img.style.width = "100px";
  return img;
};

const renderingMyInf = (userData) => {
  const userAvatar = userData.avatar.data;
  console.log(userAvatar)
  const imgContainer = document.getElementById('myAvatar');
  const img = createImage(userAvatar);
  console.log(img)
  imgContainer.appendChild(img);

  const username = document.getElementById("username");
  const accountId = document.getElementById("accountId");
  const email = document.getElementById("email");

  username.innerHTML = userData.username;

  accountId.innerHTML = `account id: ${userData.account_id}`;

  email.innerHTML = `email: ${userData.email}`;
};

const renderingMyPosts = (myPostsData) => {
  const myPostsCardGroup = document.getElementById("myPostsCardGroup");
  myPostsCardGroup.innerHTML = "";

  myPostsData.forEach((post) => {
    const postPhotoData = post.photo_data[0].data;
    const img = createImage(postPhotoData)
    console.log(postPhotoData)
    const truncatedDescription = truncateInf(post.description, 100);
    const cardHTML = `
      <div class="card col-12 col-md-6 col-lg-4 mb-4">
        <img src="${img.src}" class="card-img-top mt-2 rounded">
        <div class="card-body">
          <h5 class="card-title mt-4">${post.title}</h5>
          <p class="card-text" style="color: #777;">${timeSince(post.date)}</p>
          <p class="card-text mt-2">${truncatedDescription}</p>
          <div class="more">
            <a href="#">
              <i class="fa fa-arrow-circle-o-right" aria-hidden="true" id="moreInf"></i> More >> 
            </a>
          </div>
        </div>
      </div>
    `;
    myPostsCardGroup.insertAdjacentHTML("beforeend", cardHTML);
  });
};

const renderingMyComments = (myCommentsData) => {
  const myCommentsCardGroup = document.getElementById("myCommentsCardGroup");
  myCommentsCardGroup.innerHTML = ""; 

  myCommentsData.forEach((comment) => {
    const commentAvatarData = comment.avatar.data;
    const avatarImg = createImage(commentAvatarData)
    const commentPhotoData = comment.photo_data[0].data;
    const photoImg = createImage(commentPhotoData)
    console.log(commentPhotoData)
    const truncatedDescription = truncateInf(comment.description, 60);
    const cardHTML = `
    <div class="card col-12 mb-4 border border-3">
      <div class="card-body d-flex mt-2">
        <div class="col-lg-3 col-md-3 col-sm-3">
          <img src="${avatarImg.src}" class=" rounded-circle" width="60">
        </div>
        <div class="col-9 px-3">
          <h5 class="card-title">${comment.username}</h5>
          <p class="card-text" style="color: #777;">${timeSince(
            comment.date
          )}</p>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text">${comment.comment}</p>
      </div>
      <div class="card-body d-flex px-3 mb-2 border border-2 rounded">
        <img src="${photoImg.src}" class="col-3 rounded" alt="Post Image" style="width:calc(100vw / 4); height: calc(100vw/4 * 9 / 10); object-fit: cover;">
        <div class="col-9 px-3">
          <h6 class="card-title mb-1">${comment.title}</h6>
          <p class="card-text mb-1 commentDescription">${truncatedDescription}</p>
        </div>
      </div>
    </div>
    `;
    myCommentsCardGroup.insertAdjacentHTML("beforeend", cardHTML);
  });
};

// const localToken = localStorage.getItem("token");
// const userData = localStorage.getItem("userData");
// const userDataObj = JSON.parse(userData);
// const account_id = userDataObj.account_id;

//function to get userdata
// const getUserData = async () => {

//   try {
//     const response = await fetch(`${backendUrl}/user/${account_id}`);
//     const userData = await response.json();
//     console.log(userData);
    
//   } catch (error) {
//     console.log(error.message);
//   }
// };

//function to get post data by account_id
const getPostData = async (account_id) => {
  
  try {
    const response = await fetch(`${backendUrl}/posts/account/${account_id}`);
    const myPostsData = await response.json();
    
    return myPostsData;
  } catch (error) {
    console.log(error.message);
  }
};

const getCommentData = async (account_id) => {
  
  try {
    const response = await fetch(`${backendUrl}/posts/comments/${account_id}`);
    const myCommentsData = await response.json();
    
    return myCommentsData;
  } catch (error) {
    console.log(error.message);
  }
};

function truncateInf(message, maxLength) {
  if (message.length <= maxLength) {
    return message;
  } else {
    return message.slice(0, maxLength) + "...";
  }
}

function timeSince(timestamp) {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

document.addEventListener("DOMContentLoaded", async () => {
  //get account_id:
  const localToken = localStorage.getItem("token");
  const userData = localStorage.getItem("userData");
  const userDataObj = JSON.parse(userData);
  const account_id = userDataObj.account_id;
  //get 
 
  const myPostsData = await getPostData(account_id);
  const myCommentsData = await getCommentData(account_id);
  
  // console.log(userDataObj)
  // console.log(account_id)
  // console.log(myPostsData)
  // console.log(myCommentsData)

  renderingMyInf(userDataObj);
  renderingMyPosts(myPostsData);
  renderingMyComments(myCommentsData);
  registration(backendUrl);
  login(backendUrl);
  loginStatusIsValid(localToken, backendUrl);
  jumpToSearchResult();
  logout();
});



// moreInf.addEventListener("click", async () => {

// });
