# Work-Day-Scheduler
This Work Day Scheduler achieves full functionality in a clean and efficient manner. It effictively uses the Moment.js API, and enables the user to track their daily schedule through an hourly, color-coded system.

[Follow this link to see the live page!](https://clairevita.github.io/Scheduler/)

## Page Appearance
![Front Page Screenshot](https://i.imgur.com/uV3xpze.png)

Standard to the expectations of the project, this page is features no frills or excess. It is clean and to the point of the project assignment.

At the top of the page is a title featuring the day and date the site is accessed.

Below is a button indicating the ability to clear one's schedule.

The page features a 12 rows of three columns breaking down the hours of a work day, with the center being a text input for the user to submit their tasks.

Dependent on the time of day the page is accessed, the rows change colors to reflect what is the present (red), the pass (green), and future (grey).

Next to each text area is a lock button which indicated the ability to save one's task.

## User Functionality

The purpose the page serves is to enable the user to enter, save, and return to their daily tasks. 

When a user clicks a text area element, they are able to type in the task they need to accomplish that hour. When they do so, the button element to the right of the text area turns red and the lock icon changes to an open padlock, to indicate that their changes have not been saved.

![After clicking a text area](https://i.imgur.com/3TlwGH1.png)

When the user clicks the red button, the lock returns to it's origin status, and the user's text has been saved to that hourly location.

![After selecting lock button](https://i.imgur.com/3HhQdkw.png)

When the user refreshes the page, the user generated content persists in the location originally inputted. 

What the page needs next is the ability to clear out one's schedule should it persists into the next day. At the top of the screen is a yellow button stating Clear Schedule? When pressed a Confirm prompt appears on the window asking if they are sure they want to delete. This safety measure ensures the page isn't accidentally cleared.

![Are you sure?](https://i.imgur.com/iMiPpS2.png)

When they confirm, all text areas are emptied of their text, and locally stored data is emptied.

## Javascript Functionality

This project consists of two primary funcationalities: 
1. Moment.js
2. Local Storage

### 1. Moment.js

Moment.js is an API that enables time stamp retrieval at the moment of API access. We call the API for two purposes.

The first purpose is to update the data at the top of the page. When the page loads, the date is automatically updated to reflect the current day

The second purpose is to color code each of the rows according to the time of the day. When the page loads, the current time is stamped and parsed as an integer. This number is used to change the classes according to the numbers assigned to each of the rows. 

```
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
```
### 2. Local Storage

The final major Javascript feature is the interaction with the user's Local Storage. 

The functionality of the lock button is simple on the user-View (changing color, changing icon) but holds a lot of gravity for the rest of the front-end experience. When the button is pressed, the text-area data is stored into the local storage corresponding to the hour number associated.

When the page is reloaded, an identical for loop `for (let i = 8; i <= 20; i++){}` as the Moment.js color-coding is used to retrieve any locally stored data to the View.
```
    for (let i = 8; i <=20; i++){
        //This translates the index value into a string.
        let keyVal = JSON.stringify(i)
        //Using the keyVal variable, we retrieve any locally stored data, and assign it as a value to the corresponding text areas.
        $("#text" + i).val(localStorage.getItem(keyVal))
```

When the user clicks the `Clear Schedule` button at the top of the page, it not only empties all of the text values within the text areas, but deletes all of the Locally Stored strings to ensure that on page load, no data is retrieved and reentered. This also ensured that users won't have to manually delete and re-save their schedule on a new day:
```
for (let i=8; i<=20;i++){
                //Delete the local storage variable with the data logged under i.
                localStorage.removeItem(i);
                //Make the text area value empty.
                $("#text" + i).val("");
                        }
```

