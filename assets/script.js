
// <!-- =====  Random Quote Generator- JAVASCRIPT--52Lines  ===== -->

const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;
    

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}


// sound Button
speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        // SpeechSynthesisUtterance is Web Speech API interface represents a speech request.It contains the content the speech service should read and 
        // information about how to read it(e.g.language, pitch and volume)
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});


// copy Button
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});


// twitter Button
twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

// click Button
quoteBtn.addEventListener("click", randomQuote);