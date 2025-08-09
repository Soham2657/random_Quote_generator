const quoteText=document.getElementById("quote-text");
const authorText=document.getElementById("quote-author");
const generateBtn=document.getElementById("generate-btn");
//make backupQuoyes incase the api failed to fetch 
const backupQuotes=[
    {
 content: "The only way to do great work is to love what you do.",
author: "Steve Jobs"
},
{
content: "Innovation distinguishes between a leader and a follower.",
author: "Steve Jobs"
},
{
content: "Life is what happens to you while you're busy making other plans.",
author: "John Lennon"
},
{
content: "The future belongs to those who believe in the beauty of their dreams.",
author: "Eleanor Roosevelt"
},
{
content: "It is during our darkest moments that we must focus to see the light.",
author: "Aristotle"
}
];
//create a function to return a random object from backupQuotes array
function getBackupQuotes(){
    const randomIndex=Math.floor(Math.random()*backupQuotes.length);
    return backupQuotes(randomIndex);
}
//now make the function to fetch api
async function getRandomQuotes(){
    //change some parts while generating quotes
try{
    generateBtn.disabled=true;
authorText.textContent='';
quoteText.textContent='Loading...';
quoteText.className='quote-text';

//fetch 
const response= await fetch('https://dummyjson.com/quotes/random');
if(!response.ok){
    throw new Error('API not available');
}
//convert response to json
const data= await response.json();
quoteText.textContent=`"${data.quote}`;
authorText.textContent=`-${data.author}`;
quoteText.className='quote-text';
}catch(error){
    // If API fails, use backup quotes
console.log('API failed, using backup quote:', error.message);
const backupQuotes = getBackupQuotes();
 quoteText.textContent = `"${backupQuotes.content}"`;
quoteText.className = 'quote-text';
authorText.textContent = `— ${backupQuotes.author}`;
}finally{
    //re-eanable the generate button
 generateBtn.disabled=false;
}
}
//add eventlisteners
generateBtn.addEventListener('click',getRandomQuotes);
getRandomQuotes();

