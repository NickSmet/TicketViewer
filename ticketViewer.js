function buildTransactionCollapsible (
  item_name,
  item_content,
  id
) {

let item_id = 'message'+id
let button_id = 'btn_' + item_id
let item_target = '#' + item_id

let collapsible =
`<div>
<button type="button" id=${button_id} class="btn btn-primary btn-xs" aria-pressed="true" data-toggle="collapse" data-target=${item_target}>➤</button>
<a style="text-decoration: none; text-decoration: none; background-color: unset !important;">${item_name}</a>\
<div id=${item_id} style="white-space: pre-wrap;" class="collapse">
${item_content}</div>`

return collapsible

}

function finalTouches(){
  $('.btn-primary').click(function () {
    $(this).text(function (i, old) {
      return old == '➤' ? '▼' : '➤' //took it here: https://stackoverflow.com/questions/16224636/twitter-bootstrap-collapse-change-display-of-toggle-button
    })
  })}

function parseMessage(element, id, type){

  let transactionDescription = $(element).nextAll("*:lt(4)").text()

  if(transactionDescription.match(/Comment added/)){type = 'comment'}

  const isFirst = $( element ).next().attr('class')==' text-nowrap' //the 'txn-outgoing' elements go in pairs. We skip second one. 
  
  if (!isFirst){return}

  const date = $( element ).next().text()
  const author = $( element ).next().next().next().text()

  let test = /See full message body|text\/(plain|html) .*/gm

  //const message = $( element ).parent().next().children().eq(1).text().replace(/\n +\n +/gm,"").replace(/\n\n/gm,'').replace(/\n\n/gm,"\n").replace(/\n\n/gm,"\n").replace(test,'\n').replace(/\n\n/gm,'\n').replace(/Expand quote [^\{]*/gm,'')

let message = ''

$(element)
  .parent()
  .next()
  .children()
  .eq(1).find('.messagebody').find('div').each(

    function( index ) {
      
      let line = $(this).find("br").replaceWith("\n").end().text()

      if (type=='chat'){

        line = ''
       
        $(this).children("div").each(

          function( index ) {
            if($(this).text().length<2){return}
            console.log($(this).text());
          
            line = line+$(this).text()+'\n'
          }
          
        )
      }
      
      if(line.match(/Transcript of your chat with Visitor/)){type = 'chat'}
      if(line.match(/\s+Subject\:/)){return}
      if(line.match(/Expand quote/)){return false}
      
      if(line.length>2)
      {message = message+line+'\n'}
      
    }
  )

  let authorPrefix
  switch(type) {
    case 'in':
      authorPrefix = '🐱'
      break;
    case 'out':
      authorPrefix = '🎧'
      break;

      case 'chat':
        authorPrefix = '⌨️'
        break;

      case 'comment':
        authorPrefix = '💬'
        break;
  
    default:
      // code block
  }

  
  // console.log(message);

  const bullet = authorPrefix+author+'\n '+date;

  $("#summaryContainer").append($(buildTransactionCollapsible(bullet,message, id)))
  
}

function cycleMessages(){
  
  $('td').each(
    function( index ) {

      switch($( this ).attr('class')) {
        case 'txn-outgoing':
         parseMessage(this, index,'out')
          break;
        case 'txn-inbound':
          parseMessage(this, index, 'in')
          break;
      
        default:
          // code block
      }
    }
  )

  
}

function main(){
  cycleMessages()
  setTimeout(finalTouches, 1000);
}


$("body > div.container-fluid > div:nth-child(2)").prepend($('<button class="btn btn-info" id="SUMMARY" >SUMMARY</button>'))
$("body > div.container-fluid > div:nth-child(2)").prepend($('<span id="summaryContainer" ></span>'))

$("#SUMMARY").click(function(){
  $("#SUMMARY").remove()
  main()

});


