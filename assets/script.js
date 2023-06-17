// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs();
var hour = today.$H;
console.log(today);
console.log(hour);

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").click(function(event)
  {
    event.stopPropgation();
    //event.StopImmediatePropagation();
    console.log("was clicked");
  });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  domCreate();
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  // TODO: Add code to display the current date in the header of the page.
  timeCounter();
});

function domCreate()
{
  for( var i = 0; i < 24; i++)
  {
    //create the hour block div
    var hourBlock = $("<div id = 'hour-" + i +"' class= 'row time-block'>");
    var label;
    var classes = '<div class="col-2 col-md-1 hour text-center py-3">';
    //create div with the hour label
    if(i === 0)
      label = $(classes + 12 + 'AM</div>');
    else if ( i === 12)
      label = $(classes + 12 + 'PM</div>');
    else if (i < 12)
      label = $(classes + i + 'AM</div>');
    else
      label = $(classes + (i-12)+'PM</div>');
    //add text area
    var textArea = $('<textarea class="col-8 col-md-10 description" rows="3">');
    //add button
    var button = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
    //add save button icon
    var saveIcon = $('<i class="fas fa-save" aria-hidden="true">');
    
    //append everything
    $("#schedule").append(hourBlock);
    $("#hour-"+i).append(label);
    $("#hour-"+i).append(textArea);
    $("#hour-"+i).append(button);

    // check if it is past, present or future and add color accordingliy
    var grey = '#d3d3d3';
    var red = '#ff6961';
    var green = '#77dd77';
    if(hour === i)
    {
      $("#hour-"+i).addClass("present");
      textArea.css({'background-color': red, 'color': 'white'}); 
    } 
    else if(hour > i) 
    {
      $("#hour-"+ i).addClass("past");
      textArea.css({'background-color': grey, 'color': 'white'});
    }
    else
    {
      $("#hour-"+ i).addClass("future");
      textArea.css({'background-color': green, 'color': 'white'});
    }
      
    
  }
  //append icon outside or the icon would appear 12 times
  $("button").append(saveIcon);
}

function timeCounter()
{
    var timeInterval = setInterval(function()
    {
        today = dayjs();
        $('#currentDay').text(today);
              
    },1000 );
}