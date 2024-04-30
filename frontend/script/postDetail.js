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

//get postId:
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('postId');

console.log(postId); 


const backendUrl = "http://localhost:3001";
const stars = document.getElementsByClassName("stars")[0];
const icons = document.querySelectorAll(".stars .fa-star");
let vote = 0;
const score = document.getElementById("score");
const submitRate = document.getElementById("submitButton");
score.innerText = vote;

const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("comment");
const textarea = document.querySelector("textarea");
const useCount = document.getElementById("useCount");



const getPostByPostId = async () => {
   // get post_id
  try {
    const response = await fetch(`${backendUrl}/posts/${postId}`);
    const postData = await response.json();
    console.log(postData);
    return postData;
  } catch (error) {
    console.log(error.message);
  }
};

const getCommentsByPostId = async () => {
  // get post_id
  try {
    const response = await fetch(`${backendUrl}/posts/${postId}/comments`);
    const commentsData = await response.json();
    console.log(commentsData);
    return commentsData;
  } catch (error) {
    console.log(error.message);
  }
};

const createImage = (photoData) => {
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


const renderPostPage = (postData) => {
  console.log("postData", postData.username);
  const photoData = postData.photo_data[0].data;
  console.log(photoData);
  const imgContainer = document.getElementById('myPostPhoto');
  const img = createImage(photoData);
  console.log(img)
  imgContainer.appendChild(img);

  const author = document.getElementById("author");
  author.textContent = postData.username;

  const averageScore = document.getElementById("averageScore");
  averageScore.innerHTML = postData.rate;

  const title = document.getElementById("postTitle");
  title.textContent = postData.title;

  const postContent = document.getElementById("postContent");
  postContent.textContent = postData.description;

  const time = document.getElementById("date");
  time.textContent = timeSince(postData.date);

  const commentsNum = document.getElementById("commentsNum");
  commentsNum.textContent = `Comments List (${postData.comment_num})`;

  
};



const renderingComments = (commentsData) => {
  const commentsCardGroup = document.getElementById("commentsCardGroup");
  console.log(commentsData);
  commentsData.forEach((comment) => {
    const avatarData = comment.avatar.data;
    console.log(comment.avatar.data)
    const img = createImage(avatarData)
    console.log(img.src)
    const cardHTML = `
    <div class="card col-12 mb-2">
      <div class="card-body d-flex mt-2">
        <div class="col-lg-3 col-md-3 col-sm-3 text-lg-right text-md-right text-sm-right">
          <img src="${img.src}" class="mb-2 rounded-circle" width="50">
        </div>
        <div class="col-9 px-3">
          <h6 class="card-title">${comment.username}</h6>
          <p class="card-text" style="color: #777;font-size: 12px;">${timeSince(
            comment.date
          )}</p>
        </div>
      </div>
      <div class="card-body mb-2">
        <p class="card-text">${comment.comment}</p>
      </div>
    </div>
    `;
    commentsCardGroup.insertAdjacentHTML("beforeend", cardHTML);
  });
};


stars.addEventListener("click", async function (event) {
  renderingVote();
});

submitRate.addEventListener("click", async function (event) {
  location.reload();
});

// rendering stars when rating
async function renderingVote() {
  vote = 0;
  for (let i = 0; i < 5; i++) {
    icons[i].style.setProperty("--v", 0);
    if (icons[i] == event.target) {
      vote = i;
      for (let j = 0; j < i; j++) {
        icons[j].style.setProperty("--v", 100);
      }
      let ps = event.clientX - icons[i].getBoundingClientRect().left;
      if (ps / icons[i].offsetWidth < 0.5) {
        icons[i].style.setProperty("--v", 50);
        vote += 0.5;
      } else {
        icons[i].style.setProperty("--v", 100);
        vote++;
      }
    }
  }
  score.innerText = vote.toFixed(1);

  try {
    const response = await saveStars(vote);
    console.log(vote);
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
  //window.location.href = 'avg_stars.html'
}

//console.log(postId)

//const localToken = localStorage.getItem("token");
// const searchParams = new URLSearchParams(window.location.search);
// const post_id = '2';
// const pageInf = new posts(backendUrl, `posts/${post_id}`);
// console.log(pageInf)
// renderingMyPosts(postData);
// loginStatusIsValid(localToken, backendUrl);
// registration(backendUrl);
// login(backendUrl);
// logout();
// // });


const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
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
  // return `${Math.floor(seconds)} seconds ago`;
  return "just now";
};

//comment input
commentForm.addEventListener("submit", async function (event) {
  try {
    event.preventDefault();
    const response = await saveComment(commentInput.value);
    commentInput.value = "";
    useCount.innerText = 0;
    commentInput.focus();
    location.reload();
    // addCommentToPage(commentInput.value);
  } catch (error) {
    console.error(error);
  }
});



commentInput.addEventListener("input", function () {
  useCount.innerText = commentInput.value.length;
});

const saveComment = async (comment) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const post_id = urlParams.get('postId');

  const localToken = localStorage.getItem("token");
  const userData = localStorage.getItem("userData");
  const userDataObj = JSON.parse(userData);
  const account_id = userDataObj.account_id;
  
  try {
    const response = await fetch(backendUrl+"/newcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: post_id,
        account_id: account_id,
        comment: comment,
        date: new Date(),
      }),
    });
    return response.json();
  } catch (error) {
    alert("Error saving stars: " + error.message);
  }
};

// saveStars.addEventListener("submit",(event)=>{
//   //console.log(article_id);
//   // window.location.href = 'rate.html'
//   window.location.reload()

// })

const saveStars = async (vote) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const postId = urlParams.get('postId');
  
  console.log("postId", postId);
  try {
    const response = await fetch(backendUrl + "/newrate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        rate: vote,
      }),
    });
    return response.json();
  } catch (error) {
    alert("Error saving stars: " + error.message);
  }
};

const renderingStars = async (avgStars) => {
  const starIcons = document.querySelectorAll(".avgStars .fa-star");

  for (let i = 0; i < starIcons.length; i++) {
    if (avgStars >= i + 1) {
      starIcons[i].classList.add("rated");
      starIcons[i].classList.remove("half-rated");
    } else if (avgStars > i) {
      starIcons[i].classList.add("half-rated");
      starIcons[i].classList.remove("rated");
    } else {
      starIcons[i].classList.remove("rated");
      starIcons[i].classList.remove("half-rated");
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
 

  // renderPostPage(postData);
  const postData = await getPostByPostId();
  renderPostPage(postData);
  renderingStars(postData.rate);
  //   console.log(postData);
  //   console.log(postData.rate);
  const commentsData = await getCommentsByPostId();
  renderingComments(commentsData);

  const localToken = localStorage.getItem("token");

  registration(backendUrl);
  login(backendUrl);
  loginStatusIsValid(localToken, backendUrl);
  jumpToSearchResult();
  logout();
});
