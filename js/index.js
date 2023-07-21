let alarms=[];
setInterval(()=>{
    let time =new Date().toLocaleTimeString("en-us",
    { hour: "2-digit",minute:"2-digit",second:"2-digit", hour12: true }
    );
    let showTime=document.getElementsByClassName("show-time")[0].querySelector("span:first-child");
    showTime.innerHTML=time;
    snoozAlarm(time);
},1000)

// Set alarms

function setAlarm(event) {
    let hour=document.getElementById("hours").value;
    let minuts=document.getElementById("minuts").value;
    let seconds=document.getElementById("seconds").value;
    if (isNaN(Number(hour)) || isNaN(Number(seconds)) || isNaN(Number(minuts))) {
        alert("Please Enter valid Time");
        return;
    }
    if (Number(hour)>12 ||  Number(hour)<=0 || Number(seconds)<0 || Number(seconds)>59 ||  Number(minuts)<0 || Number(minuts)>59 ) {
        alert("Please Enter valid Time");
        return; 
    }
    if (hour.length===1) {
        hour=`0${hour}`
    }

    if (minuts.length===1) {
        minuts=`0${minuts}`
    }

    if (seconds.length===1) {
        seconds=`0${seconds}`
    }
    let meridiem=document.getElementById("Meridiem").value;
    let timeStr=`${hour}:${minuts}:${seconds} ${meridiem}`
    let index=alarms.indexOf(timeStr);
    if (index!==-1) {
        alert("Alarm is already set for this duration");
        return;
    }else{
        alarms.push(timeStr);
        showAlarmList()
    }
    event.stopPropagation();
}
document.getElementById("setalalarm").addEventListener("click",setAlarm);


// Show all alarms list

function showAlarmList() {
    let container=document.getElementById("alarmlist");
    container.style.listStyle="none"
    container.innerHTML="";
    for (let index = 0; index < alarms.length; index++) {
        let li=document.createElement("li");
        li.classList.add("flex");
        li.classList.add("alarm-list")
        let div=document.createElement("div");
        let span=document.createElement("span");
        span.classList.add("colorWhite")
        span.innerHTML=alarms[index];
        div.append(span);
        let deletebutton=document.createElement("div");
        deletebutton.className="Alarm-btn colorWhite delete-alarm-btn"
        deletebutton.innerHTML="Delete"
        deletebutton.id="deletealarm"
        deletebutton.addEventListener("click",deleteAlarm);
        li.append(div,deletebutton);
        container.append(li);
    }
}

// delete alarm
function deleteAlarm(event) {
    let timeStr=event.target.previousElementSibling.querySelector("span").innerHTML;
    let index=alarms.indexOf(timeStr);
    if (index!==-1) {
        alarms.splice(index,1);
        showAlarmList()
        return;
    }
}


function snoozAlarm(timeStr) {
    let index=alarms.indexOf(timeStr);
    if (index!==-1) {
        alert("Hey, Wake up men!");
        alarms.splice(index,1);
        showAlarmList()
    }
}