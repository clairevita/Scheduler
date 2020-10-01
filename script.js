//This function is a best practice to ensure the page has been loaded before committing any functions.
$(document).ready(function(){

    //This pulls the div section titled current day, then sets it's text content according to Moment.js day, date, month, and year.
    $("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

    //This fetches the current timestamp from the Moment.js API. 
    let actualTime = parseInt(moment().format("HH"));
    
    //This applies the color classes to the section blocks according to the Moment.js timestamp.
    function showTime(){
        console.log(actualTime);
        //Index value will correspond with timestamps between 8 and 20 (8AM and 8PM respectively).
        for (let i = 8; i <= 20; i++){
            //This assigns the hour block that the new color class will be assigned to. We are using our index value to modify the output according to the for loop context.
            let hourBlock =  $("#hour" + i);
            //If real time is equal to the index, it is the present.
            if (i == actualTime){
                hourBlock.addClass("present");
            //If real time is greater than the index, it is assigning the future color class.
            } else if (actualTime > i){
                hourBlock.addClass("future");
            //If real time is less than the index, it is assigning the past color class.
            } else if (actualTime < i){
                hourBlock.addClass("past");
            //Otherwise, something went wrong. I encourage the programmer reviewing this code to verify nothing substantial has changed in the Moment.js API. 
            } else{
                console.log("Error encountered with assigning the color classes. Check the Moment.js API documentation for updates.")
            }
        }
    }

    //This is a user experience element to remind the user to save their task before leaving the page.
    $(".addTask").on("click", function(){
        //This identifies the what the id is of the text area.
        let saveValue = $(this).attr("id");
        //This slices off the number from the end of that id, and iterates it as an integer.
        let sectionHour = parseInt(saveValue.slice(4));

        //This turns the button red, indicating that it has not been saved yet.
        $("#button" + sectionHour).attr("style", "background-color:#ff6961;");
        //This removes the lock icon.
        $("#icon" + sectionHour).removeClass("fa fa-lock");
        //This replaces the lock icon with an unlocked icon, indicating that they need to click it to secure their information.
        $("#icon" + sectionHour).attr("class", "fa fa-unlock");
    })

    //Whenever a player clicks on the save button, it pushes the text area's string values to local storage. 
    $(".saveBtn").on("click", function(){
        //This identifies the what the id of the button selection is.
        let saveValue = $(this).attr("id");
        //This slices off the number from the end of that id, and iterates it as an integer.
        let sectionHour = parseInt(saveValue.slice(6));
        //This uses the identified integer to find what the corresponding text area says.
        let fieldText = $("#text" + sectionHour).val();
        console.log(fieldText);
        //If there is new text there, the page pushes it into localstorage, using the integer as the key for future context.
        if (fieldText){
            localStorage.setItem(sectionHour, fieldText)
        }
        //This returns the button to the cyan color
        $("#button" + sectionHour).attr("style", "background-color:#06AED5;");
        //This removes the unlocked icon.
        $("#icon" + sectionHour).removeClass("fa fa-unlock");
        //This replaces the unlocked icon with the locked icon.
        $("#icon" + sectionHour).attr("class", "fa fa-lock");
    });

    //This for loop runs through each of the possible hours.
    for (let i = 8; i <=20; i++){
        //This translates the index value into a string.
        let keyVal = JSON.stringify(i)
        //Using the keyVal variable, we retrieve any locally stored data, and assign it as a value to the corresponding text areas.
        $("#text" + i).val(localStorage.getItem(keyVal))
    }

    //This initiates the color coding of the time blocks in the document
    showTime();

    //As a simple fix for clearing out a schedule, this function is bound to a button at the top of the page to see if the user wants to clear their tasks.
    $("#cleanSlate").on("click", function(){
        //To make sure this isn't pressed accidentally, this confirm prompt ensures they want to commit.
        let safetyCheck = confirm("Are you sure?");
        //If they approve:
        if (safetyCheck){
            //For each possible hour:
            for (let i=8; i<=20;i++){
                //Delete the local storage variable with the data logged under i.
                localStorage.removeItem(i);
                //Make the text area value empty.
                $("#text" + i).val("");
            }
        }

    });

});
