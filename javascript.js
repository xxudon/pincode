
var pinCodeNumbers = 0;
var code = 0;
var pInput = document.getElementById("pinCode");

function PIN(number) {
  var pinInput = document.getElementById("pinCode");
  var currentPin = pinInput.value;
  if (number === 91) {
    pinInput.value = currentPin.slice(0, -1);
    pinCodeNumbers--;
  } else if (pinCodeNumbers < 4) {
    pinCodeNumbers++;
    pinInput.value = currentPin + number;
    console.log(pinInput.value);
    code = pinInput.value;
  }
}

/*
Typ 1 = In
Typ 2 = Rast In
Typ 3 = Rast Ut
Typ 4 = Ut
*/
async function Tid(Typ){
  var today = new Date();
  var day = today.getDate(); 
  var month = today.getMonth() + 1;
  var time = today.getHours() + ":" + today.getMinutes();

  switch(month){
    case 1:
        month = "Jan"
        break;
    case 2:
        month = "Feb"
        break;
    case 3:
        month = "Mars"
        break;
    case 4:
        month = "Apr"
        break;
    case 5:
        month = "May"
        break;
    case 6:
        month = "Jun"
        break;
    case 7: 
        month = "Jul"
        break;
    case 8:
        month = "Aug"
        break;
    case 9:
        month = "Sep"
        break;
    case 10:
        month = "Okt"
        break;
    case 11:
        month = "Nov"
        break;
    case 12:
        month = "Dec"
        break;
}

  if (pinCodeNumbers != 4) {
    alert("Pinen kräver 4a siffror");
  } else {
    // Create an object with the data to be sent to the server

    var data = {
      pinCode: code,
      tid: time,
      dag: day,
      month: month,
      In: Typ
    };

    pInput = "";
    try{
      const res = await fetch("api/tid",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const response = await res.json();
        if (response.ok) {
          // Data stored successfully
          pinCodeV.value = '';
          pinCodeNumbers = 0;
        }  else if (response.message == "newTable"){
          newTable();
        }
        else if (response.message == "time") {
          lon()
        }
        else {
          // Error storing data
          console.log('Error storing data:', response.statusText);
        }
      }catch{
        console.error(error)
      }
  }
}

async function lon(){
  const res = await fetch("/api/time",{
    method:"GET",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const response = await res.json()

  const time = {
    borjade: response.message.började,
    rastIn: response.message.börjaderast,
    rastUt:response.message.slutaderast,
    slutade:response.message.slutade
  }
  console.log(time)

  

}

