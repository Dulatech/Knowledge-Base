
var ser = document.getElementById("searchInput")
if(ser){
ser.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("searchForm").submit();
    }
});
}

function show_replies(click){
    // var allElements= document.querySelectorAll('[id="allReplies"]');
    // for(i=0;i<allElements.length;i++){
    //     allElements[i].style.display="none";
    //  }
    var elements=click.parentNode.children;
    
    var allReplies = elements.item(5).style;
    allReplies.display = allReplies.display==='block' ? 'none' : 'block';
    // (btn.parentNode.parentNode.parentNode.parentNode).removeChild(btn.parentNode.parentNode.parentNode);
}

function look_click(){
    document.getElementById('searchBtn').click();
}