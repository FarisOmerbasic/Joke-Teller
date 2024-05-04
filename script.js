const button = document.getElementById("button");
const audioElement = document.getElementById("audio");



//Disable or Enable button

function toggleButton() {
    button.disabled = !button.disabled
}

//Passing Joke
function tellMe(joke) {

    VoiceRSS.speech({
        key: 'a86f90dd5ea44845b1ff1944eb42e645',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from the API
async function getJokes() {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text-to-Speech
        tellMe(joke);
        //Disabled button
        toggleButton();
    } catch (error) {
        //Catching errors
        console.log("whoops", error);
    }

}
//Event listeners

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
