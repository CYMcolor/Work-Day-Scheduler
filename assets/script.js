// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs();
var day = today.$D; 
var hour = today.$H;
var currHour;
var buttonParent;
var saveData = function(hourID,data)
{
  this.hourID = hourID;
  this.data = data;
}
var data;
var saveDataList = [];
console.log(today);
console.log(hour);
$('#currentDay').text(today); //imeddiatley shows time upon render

$(function () {
  // TODO: Add code to display the current date in the header of the page.
  timeCounter();
  //create the dom
  domCreate();
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
  $("button").click(function(event)
  {
    //get parent id 
    buttonParent = $(this).parent().attr('id');
    console.log("presssed " + buttonParent);
    //gets the text area value
    var data = $(this).parent().children('.description').val();
    //get previsouly saved items
    if (localStorage.getItem('saved-data') !== null) 
    {
      saveDataList = JSON.parse(localStorage.getItem("saved-data"));
    }
    
    console.log(saveDataList);
    //adds new item if save data isnt empty
    if(data != '')
    {
      saveDataList.push(new saveData(buttonParent,data));
      console.log(saveDataList);
      localStorage.setItem("saved-data", JSON.stringify(saveDataList));
    }
    
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  updateHour();
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  if (localStorage.getItem('saved-data') !== null) 
  {
    showSavedItems();
  }
  
  
});

function domCreate()
{
  for( var i = 0; i < 24; i++) //for( var i = 9; i < 18; i++)
  {
    //create the hour block div
    var hourBlock = $("<div id = 'hour-" + i +"' class= 'row time-block'>");
    var label;
    var classes = '<div class="col-2 col-md-1 hour text-center py-3">';
    //create div with the hour label
    if(i === 0)
      label = $(classes + 12 + ' AM</div>');
    else if ( i === 12)
      label = $(classes + 12 + ' PM</div>');
    else if (i < 12)
      label = $(classes + i + ' AM</div>');
    else
      label = $(classes + (i-12)+' PM</div>');
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
 
  }
  //append icon outside or the icon would appear 12 times for wach button
  $("button").append(saveIcon);
}

function timeCounter()
{
    var timeInterval = setInterval(function()
    {
        today = dayjs();
        $('#currentDay').text(today);

        //if hour changes update dom to reflect hour change
        currHour = today.$H;
        currDay = today.$D;

        //updates the classes if the hour has changed
        if(hour !== currHour)
        {
          hour = currHour;
          updateHour();
        }

        //clears the day if day changed
        if(day !== currDay)
        {
          saveDataList = [];
        }
    },1000 );
}

function updateHour()
{
  // check if it is past, present or future and add color accordingliy
  for( var i = 0; i < 24; i++)
  {
    //remove the previous classses
    $("#hour-"+i).removeClass("past");
    $("#hour-"+i).removeClass("present");
    $("#hour-"+i).removeClass("future");
    //add the current classes
    if(hour === i)
      $("#hour-"+i).addClass("present");
    else if(hour > i) 
      $("#hour-"+ i).addClass("past");
    else
      $("#hour-"+ i).addClass("future");
  }
}

function showSavedItems()
{
  if (localStorage.getItem('saved-data') !== null) 
  {
  var getStorage = JSON.parse(localStorage.getItem("saved-data"));
  console.log(getStorage);
  for (var i= 0; i < getStorage.length; i++)
  {
    var curr = getStorage[i];
    $('#'+curr.hourID).children('.description').val(curr.data);
  }
}
}