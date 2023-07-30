function getFirstBeer()
{
     return fetch('http://localhost:3000/beers')
    .then(function (response)
    {
      if(!response.ok)
      {
         throw new Error("Response failed!")
      }
      return response.json();
      
    })
    .catch(function (error)
    {
      console.error("Problem fetching beer data:", error)
      return null;
    })
}





function updateBeerInfo(beerInfo)
{
   if(!beerInfo || beerInfo.length === 0)
   {
      console.error("No beer info!")
      return;
   }

   const firstBeer = beerInfo[0];

   document.getElementById("beer.name").textContent = firstBeer.name;
   document.getElementById("beer-image").src = firstBeer.img_url;
   document.getElementById("beer-description").textContent = firstBeer.description;

}

document.addEventListener('DOMContentLoaded', () =>
{
   getFirstBeer().then((beerInfo) => {
      updateBeerInfo(beerInfo);
   });
})

function displayBeerNames()
{
 fetch('http://localhost:3000/beers')
 .then(res => res.json())
 
 .then(data =>{
    data.forEach(drink => {
    const innerList = document.querySelector("li");
    innerList.innerText = `${drink.name}`
    document.querySelector("ul").appendChild(innerList)
    });
 });
}
function postAndDisplayReviews()
{
   document.addEventListener('DOMContentLoaded', ()=>
   {
      let form = document.querySelector("#review-form")
      form.addEventListener('submit', (e) => {
      e.preventDefault()
      postReview(e.target.review.value)
      form.reset();
     });
   })

 function postReview(review)
 {
   let reviewList = document.querySelector("#review-list li")
   let btn = document.createElement("button");
   btn.addEventListener('click', deleteReview)
   btn.textContent = "Delete review"
   reviewList.textContent = `${review} `;
   reviewList.appendChild(btn);
   console.log(reviewList)
   document.querySelector("#review-list").appendChild(reviewList)
 }

 function deleteReview(e)
 {
   e.target.parentNode.remove();
 }
}

function updateDescription()
{
   document.addEventListener('DOMContentLoaded', ()=>
   {
      let description = document.querySelector("#description-form")
      description.addEventListener('submit' , (e) => {
      e.preventDefault()
      postDescription(e.target.description.value)
      description.reset();
      });
   })

   function postDescription(postedDescription)
   {
      let newBeerDescription = document.querySelector("em");
      newBeerDescription.textContent = postedDescription;
      document.querySelector("p").appendChild(newBeerDescription)
   }
}
updateDescription();
postAndDisplayReviews();
displayBeerNames();
