firebase.initializeApp(window.static.firebase);

const messaging = firebase.messaging();
messaging.usePublicVapidKey(window.static.data.vapid);

messaging.onTokenRefresh(function () {
  messaging.getToken().then(function (refreshedToken) {
    console.log('Token refreshed.');
    setTokenSentToServer(false);
    sendTokenToServer(refreshedToken);
  }).catch(function (err) {
    console.log('Unable to retrieve refreshed token ', err);
    showToken('Unable to retrieve refreshed token ', err);
  });
});

messaging.onMessage(function (payload) {
  // on message show push
  console.log('Message Received. ', payload);

  if (!payload.data) {
    payload.data = {};
  }

  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
    image: payload.data.hasOwnProperty('gcm.notification.image') ? payload.data['gcm.notification.image'] : undefined
  });
});

function sendTokenToServer(currentToken) {
  // send to server
  if (!isTokenSentToServer()) {
    const request = {
      "accountId": "00000000-0000-0000-0000-000000000000",
      "registrationToken": currentToken,
      "culture": window.static.data.culture,
      "countryCode": window.static.data.countryCode,
      "currency": window.static.data.currency,
      "masterToken": window.static.data.masterToken,
      "bannerTag": window.static.data.bannerTag,
      "brandCode": window.static.data.brandCode,
      "siteCode": window.static.data.siteCode
    };

    console.log('Sending token to server...', currentToken);
    subscribe(request);

    setTokenSentToServer(true);
  } else {
    console.log('Token already exists on server, logging token activity', currentToken);
    logTokenActivity(currentToken);
  }
}

function subscribe(request) {
  // send token to server for storing
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", `${window.static.data.pushApi}/api/v1/register/subscribe`);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.send(JSON.stringify(request));
}

function logTokenActivity(token) {
  // log token activity to server and keep last active date updated for token.
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("PUT", `${window.static.data.pushApi}/api/v1/register/subscriber/${token}`);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.send(null);
}

function isTokenSentToServer() {
  // check if token has already been sent to the server
  return window.localStorage.getItem('sts') === '1';
}

function setTokenSentToServer(sent) {
  // set that token has already been sent to the server
  window.localStorage.setItem('sts', sent ? '1' : '0');
}

function requestPermission() {
  // initialize accept notifications popup
  messaging.requestPermission().then(function () {
    messaging.getToken().then(function (refreshedToken) {
      sendTokenToServer(refreshedToken);
    });
  }).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
  });
}

function getCookie(name) {
  const cookieObj = this.getAllCookies();
  if (cookieObj.hasOwnProperty(name)) {
    return cookieObj[name];
  }
  return null;
}

function getAllCookies() {
  const cookieArr = document.cookie.split(';');
  const cookieObj = {};
  cookieArr.forEach((value) => {
    const split = value.trim().split('=');
    cookieObj[split[0]] = split[1];
  });
  return cookieObj;
}

requestPermission();
