var likedItems=[];
var items;
var html='';
$( document ).ready(function() {
  if(localStorage.getItem("liked")!=null){
  likedItems =localStorage.getItem("liked").split(",");
  }
    let targetUrl = 'https://api.nasa.gov/techtransfer/patent/?engine&api_key=ZKxPbuui53ycFVUYf244RGT5bOSmXr0zh7XmCo2D';
    
      $.ajax({
          url: targetUrl,
          dataType: 'json',
          success: function(result){
              items=result;
              items.results.forEach(element => {
                html ='<div class="gallery"><img src="'+element[10]+'" alt="Cinque Terre" width="600" height="400"><div class="desc">'+element[1]+' <button id='+element[0]+' onClick="updateLike(this)">Like</button></div></div>';
                if(likedItems!=null){
                if(likedItems.includes(element[0])){
                html ='<div class="gallery"><img src="'+element[10]+'" alt="Cinque Terre" width="600" height="400"><div class="desc">'+element[1]+' <button style="background-color:blue;color:white" id='+element[0]+' onClick="updateLike(this)">Like</button></div></div>';
                }
              }
                $(".container").append(html);
            });
  }
      })
  });

  function updateLike(el){
    if(el.style.backgroundColor=="blue") {
      const index = likedItems.indexOf(el.id);
      likedItems=likedItems.filter(e=>e !== el.id );
      el.style.backgroundColor="";
      el.style.color="black";
      el.innerText="Like";
      localStorage.setItem("liked", likedItems);
    }
    else{
      el.style.backgroundColor="blue";
      el.style.color="white";
      el.innerText="Unlike";
      likedItems.push(el.id);
      localStorage.setItem("liked", likedItems);
   }
    }

    function searchImage(){
      var imgName= $("#txtSearch").val();
      var item=items.results.filter(item=>item[1].includes(imgName));
      $(".container").html("");
      item.forEach(element => {
        html ='<div class="gallery"><img src="'+element[10]+'" alt="Cinque Terre" width="600" height="400"><div class="desc">'+element[1]+' <button id='+element[0]+' onClick="updateLike(this)">Like</button></div></div>';
        if(likedItems!=null){
        if(likedItems.includes(element[0])){
        html ='<div class="gallery"><img src="'+element[10]+'" alt="Cinque Terre" width="600" height="400"><div class="desc">'+element[1]+' <button style="background-color:blue;color:white" id='+element[0]+' onClick="updateLike(this)">Like</button></div></div>';
        }} 
        $(".container").append(html);
    });
    }