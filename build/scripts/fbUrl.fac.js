// Initialize Firebase
var config = {
    apiKey: "AIzaSyBCdYE-jUBdlsrUKrr7KkUbt_ErdRcIsVk",
    authDomain: "portfoliosite-5e085.firebaseapp.com",
    databaseURL: "https://portfoliosite-5e085.firebaseio.com",
    projectId: "portfoliosite-5e085",
    storageBucket: "portfoliosite-5e085.appspot.com",
    messagingSenderId: "486292035356"
};
firebase.initializeApp(config);

angular
    .module('portfolioApp')
    .factory('firebaseFac', function () {
        const rootRef = firebase.database().ref();
        return rootRef;
    });