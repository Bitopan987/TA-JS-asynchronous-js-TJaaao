let input = document.querySelector('input');
let userImg = document.querySelector('.info img');
let userName = document.querySelector('.info h3');
let userLogin = document.querySelector('.info p');
let followerUl = document.querySelector('.followers ');
let followingUl = document.querySelector('.following ');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.log('Somthing went wrong');
  };
  xhr.send();
}

function displayExtraInfo(url, rootElm) {
  rootElm.innerHTML = '';
  fetch(url, function (followerList) {
    let topFive = followerList.slice(0, 5);
    topFive.forEach((info) => {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = info.avatar_url;
      img.alt = info.name;
      li.append(img);
      rootElm.append(li);
    });
  });
}

function handleDisplay(userInfo) {
  userImg.src = userInfo.avatar_url;
  userName.innerText = userInfo.name;
  userLogin.innerText = '@' + userInfo.login;
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/followers`,
    followerUl
  );
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/following`,
    followingUl
  );
}

function handleInput(event) {
  if (event.keyCode === 13 && input.value) {
    const url = 'https://api.github.com/users/';
    let username = input.value;
    fetch(url + username, handleDisplay);
    input.value = '';
  }
}

input.addEventListener('keydown', handleInput);

// Cat

let catImg = document.querySelector('.cats img');
let catbutton = document.querySelector('button');

function handleClick() {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`,
    function (catInfo) {
      catImg.src = catInfo[0].url;
    }
  );
}

catbutton.addEventListener('click', handleClick);
