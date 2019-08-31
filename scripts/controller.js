// basic functionalities
var address = document.getElementById('address');   //BROKER address 
var clickConnect = document.getElementById('Btnconnect');
var clickDisconnect = document.getElementById("Btndisconnect");
var Status = document.getElementById("status");
var publishTopic = document.getElementById('publishTopic');
var clickPublish = document.getElementById('Btnpublish');
var payload = document.getElementById('payload');
var clickSubscribe = document.getElementById('Btnsubscribe');
var inputSubscribe = document.getElementById('subscribeTopic');
var clickUnsubscribe = document.getElementById('Btnunsubscribe');
var tableBody = document.getElementById("tableBody");
var tableBodyPublish = document.getElementById("tableBodyPublish");
var tableBodySubscribe = document.getElementById("tableBodySubscribe");
var timeStamp;

clickConnect.addEventListener('click', function () {
  client = mqtt.connect(address.value) // CONNECT to BROKER ADDRESS

  clickSubscribe.addEventListener('click', function(){
    client.subscribe("mqtt/" + inputSubscribe.value);
    timeStamp = new Date();
    var trSubscribe = document.createElement("tr");
    var tdTopicSubscribe = document.createElement("td");
    var tdTimeStampSubscribe = document.createElement("td");
    tdTimeStampSubscribe.style.fontSize = "11px";
    tdTopicSubscribe.style.fontSize = "11px";
    tdTopicSubscribe.appendChild(document.createTextNode(inputSubscribe.value));
    tdTimeStampSubscribe.appendChild(document.createTextNode(timeStamp));
    trSubscribe.appendChild(tdTopicSubscribe);
    trSubscribe.appendChild(tdTimeStampSubscribe);
    tableBodySubscribe.appendChild(trSubscribe);
  })

  clickUnsubscribe.addEventListener('click', function(){
    client.unsubscribe("mqtt/" + inputSubscribe.value);
  })



  client.on("connect", function () { //On CONNECT to BROKER
    Status.innerHTML = "Successfully connected!";
    Status.style.color = 'green';
    clickPublish.disabled = false;
    clickSubscribe.disabled = false;
    clickUnsubscribe.disabled = false;
    //console.log("Successfully connected!");
  })

  client.on("message", function (topic, payload) {
    //console.log([topic, payload].join(": "));
    timeStamp = new Date();
    var tr = document.createElement("tr");
    var tdTopic = document.createElement("td");
    var tdPayload = document.createElement("td");
    var tdTimeStamp = document.createElement("td");
    tdTopic.style.fontSize = "11px";
    tdPayload.style.fontSize = "11px";
    tdTimeStamp.style.fontSize = "11px";
    tdTopic.appendChild(document.createTextNode(topic.substring(5)));
    //console.log(topic.substring(5));
    tdPayload.appendChild(document.createTextNode(payload));
    tdTimeStamp.appendChild(document.createTextNode(timeStamp));
    tr.appendChild(tdTopic);
    tr.appendChild(tdPayload);
    tr.appendChild(tdTimeStamp);
    tableBody.appendChild(tr);
    //console.log(timeStamp);
  })
  
  clickPublish.addEventListener('click',function(){
    client.publish("mqtt/"+publishTopic.value, payload.value);
    timeStamp = new Date();
    var trPublish = document.createElement("tr");
    var tdTopicPublish = document.createElement("td");
    var tdPayloadPublish = document.createElement("td");
    var tdTimeStampPublish = document.createElement("td");
    tdTopicPublish.style.fontSize = '11px';
    tdPayloadPublish.style.fontSize = '11px';
    tdTimeStampPublish.style.fontSize = '11px';
    tdTopicPublish.appendChild(document.createTextNode(publishTopic.value));
    tdPayloadPublish.appendChild(document.createTextNode(payload.value));
    tdTimeStampPublish.appendChild(document.createTextNode(timeStamp));
    trPublish.appendChild(tdTopicPublish);
    trPublish.appendChild(tdPayloadPublish);
    trPublish.appendChild(tdTimeStampPublish);
    tableBodyPublish.appendChild(trPublish);
  })
 

  clickDisconnect.addEventListener("click", function (){ //for Disconnecting to the BROKER
    client.end();
    Status.innerHTML = "Disconnected!";
    Status.style.color = 'red';
    clickPublish.disabled = true;
    clickSubscribe.disabled = true;
    clickUnsubscribe.disabled = true;
    //console.log("Disconnected");
  })
});



















// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })