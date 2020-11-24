$(function(){
    //variables
    var mode = 0;//app mode
    var timeCounter = 0//timeCounter
    var lapCounter = 0;//lap counter
    var action;//variable for setInerval
    var lapNumber = 0;//Number of Laps

    //minutes,secound,centisecound for time and lap
    var timeMinutes, timeSecounds, timeCentisecounds, lapMinutes, lapSecounds, lapCentisecounds;

    //on app load show start and lap button
    hideshowButton("#startButton","#lapButton");

    //click on startbutton
    $("#startButton").click(function(){
        //mode on
        mode = 1;
        //show stop and lap button
        hideshowButton("#stopButton","#lapButton");
        //start counter
        startAction();
    });

    //click on stopbutton
    $("#stopButton").click(function(){
        //showresume and reset button
        hideshowButton("#resumeButton","#resetButton");
        //stop counter
        clearInterval(action);
    });

    //click on resumebutton
    $("#resumeButton").click(function(){
        //show stop and lab button
        hideshowButton("#stopButton","#lapButton");
        //start counter
        startAction();
    });

    //click on resetbutton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
        
    });

    //click on lapButton
    $("#lapButton").click(function(){
       //if mode is on
       if(mode){
           //stop action
           clearInterval(action);
           //reset lap and print lap details
           lapCounter = 0;
           addLap();
           //start action
           startAction();
       }
        
    });









    //functions
    //hideshowButton
    function hideshowButton(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }

    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter ++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter ++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        },10);
    }

    //updateTime:converts counters to mins,sec,centisec
    function updateTime(){
        //1min=60*100centisec=6000centisec
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100centisec
        timeSecounds = Math.floor((timeCounter%6000)/100);
        timeCentisecounds = (timeCounter%6000)%100;
        $("#timeMin").text(format(timeMinutes));
        $("#timeSec").text(format(timeSecounds));
        $("#timecentisec").text(format(timeCentisecounds));

        //1min=60*100centisec=6000centisec
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centisec
        lapSecounds = Math.floor((lapCounter%6000)/100);
        lapCentisecounds = (lapCounter%6000)%100;
        $("#lapMin").text(format(lapMinutes));
        $("#lapSec").text(format(lapSecounds));
        $("#lapcentisec").text(format(lapCentisecounds));
    }

    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }
    }

    //add lap function:print lap details inside the lap box
    function addLap(){
        lapNumber++;
        var myLapDetails = '<div class="lap">'+
            '<div class="lapTimetitle">'+ 'Lap' + lapNumber +
            '</div>'+
            '<div class="laptime">'+
                '<span>'+ format(lapMinutes) +'</span>'+
                ':<span>'+ format(lapSecounds) +'</span>'+
                ':<span>'+ format(lapCentisecounds) +'</span>'+
            '</div>'+
        '</div>';
        $(myLapDetails).prependTo("#Laps");
    }

});