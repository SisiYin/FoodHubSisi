export const renderingAvatar = (userData) => {
  if (!userData) {
    showUserAvatar(null);
  } else {
    const photoData = userData.avatar;
    const userAvatar = createUserAvatar(photoData, "userAvatar");
    const userAvatarInOffCanvas = createUserAvatar(
      photoData,
      "userAvatarInOffCanvas"
    );
    const userAvatarContainer = document.getElementById("userAvatarContainer");
    const userAvatarInOffCanvasContainer = document.getElementById(
      "userAvatarInOffCanvasContainer"
    );
    userAvatarInOffCanvas.classList =
      "rounded border border-2 border-white d-none";
    userAvatarContainer.appendChild(userAvatar);
    userAvatarInOffCanvasContainer.appendChild(userAvatarInOffCanvas);
    const offCanvasUsername = document.getElementById("offCanvasUsername");
    const username = userData.username;
    offCanvasUsername.textContent = username;
    const offCanvasEmail = document.getElementById("offCanvasEmail");
    const email = userData.email;
    offCanvasEmail.textContent = email;

    showUserAvatar(userData);
  }
};

const createUserAvatar = (photo, id) => {
  const photoData = photo.data;
  const uint8Array = new Uint8Array(photoData);
  const blob = new Blob([uint8Array], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  const img = document.createElement("img");
  img.id = id;
  img.src = url;
  img.alt = "userAvatar";
  img.className = "rounded border border-2 border-black d-none";
  return img;
};

const showUserAvatar = (userLoginSuccessfully) => {
  const userAvatar = document.getElementById("userAvatar");
  const userAvatarInOffCanvas = document.getElementById(
    "userAvatarInOffCanvas"
  );
  if (userLoginSuccessfully) {
    userAvatar.classList.remove("d-none");
    userAvatarInOffCanvas.classList.remove("d-none");
  } else {
    userAvatar.classList.add("d-none");
    userAvatarInOffCanvas.classList.add("d-none");
  }
};
