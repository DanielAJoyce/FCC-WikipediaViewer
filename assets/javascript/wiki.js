$( document ).ready({
  
  
});

document.getElementById('search').onclick = function(){
  var wikiTitle = [5];
  var wikiDesc = [5];
  var wikiLink = [5];
  
  var inputText = document.getElementById('searchField').value;
  
  if(!inputText.match(/\S/)){
    alert("Cannot search with empty value!");
  }else
    {
      
      $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=5&search='+inputText+'&callback=?', function(data) {
  console.log(data)
  
for(var x=0; x<5;x++)
  {
    wikiTitle[x] = data[1][x];
    wikiDesc[x]=data[2][x];
    wikiLink[x]=data[3][x];
    console.log(wikiTitle[x] + "desc=" + wikiDesc[x] + "Link=" + wikiLink[x]);
  }
 createWikiLinks(wikiTitle,wikiDesc,wikiLink);       
})
    
  }

}
function createWikiLinks(wTitle,wDesc,wLink)
{
  console.log("I made it");
  console.log(wTitle, wDesc, wLink);
  for(var z = 0;z<5;z++)
    {
    console.log(wLink[z]);
      document.getElementById(z+"Link").innerHTML = wTitle[z] + " - " +wDesc[z];
document.getElementById(z+"Link").href = wLink[z];



}
  
  var a = document.getElementById("wikiDiv");
  a.style.visibility ="visible";

}

$("#searchField").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});




