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