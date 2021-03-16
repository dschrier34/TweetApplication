//variables
const tweetList = document.getElementById('tweet-list');


//event listeners
eventListeners();

function eventListeners(){

    document.querySelector('#form').addEventListener('submit', newTweet);

    //Remove click from the list
    tweetList.addEventListener('click', removeTweet);

    //Document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad)

}


//function

function newTweet(e) {
    e.preventDefault();

    //Read the textarea value
    const tweet = document.getElementById('tweet').value

    //Create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X'

    //create an <li> element
    const li = document.createElement('li');
    li.textContent = tweet;
    tweetList.appendChild(li);

    //Add the remove button to each tweet
    li.appendChild(removeBtn);

    //Add to the list
    tweetList.appendChild(li);

    //add to local storage
    addTweetLocalStorage(tweet);

    //Print the alert
    alert('Tweet Added');

    this.reset();
}

//Remove the tweets from the DOM
function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }
    //Remove from storage
    removeTweetLocalStorage (e.target.parentElement.textContent);
}

//Adds the tweets into the local storage
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();
    

    //Add the tweet into the array
    tweets.push(tweet);

    //Convert tweet array into string
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

function getTweetsFromStorage () {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    //Get the values, if null is returned then we create an emplty array
   if(tweetsLS === null) {
        tweets = [];
}else {
    tweets = JSON.parse( tweetsLS );
}
    return tweets;
}

//Prints local Storage Tweets on Load
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    //Loop through storage and then print the values
    tweets.forEach(function(tweet) {
        //Create the remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X'
    
        //create an <li> element
        const li = document.createElement('li');
        li.textContent = tweet;
        tweetList.appendChild(li);
    
        //Add the remove button to each tweet
        li.appendChild(removeBtn);
    
        //Add to the list
        tweetList.appendChild(li);
    });
}

//Removes the tweet from local storage

function removeTweetLocalStorage (tweet){
    //get tweets from storage
    let tweets = getTweetsFromStorage();

    //remove the X from the tweet

    const tweetDelete = tweet.substring(0, tweet.length -1);

    //Loop through the tweets and remove the tweet that's equal
    tweets.forEach(function(tweetLS, index) {
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1)
        }
    })

    //Save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));
}