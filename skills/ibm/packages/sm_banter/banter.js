/////////////////////////////////////////////////////////////////////
/////////          STRATEGIC MACHINES                     ///////////
////////  MODEL MICROSERVICE LEVERAGING THE CONSTRUCTOR ///////////
//////////////////////////////////////////////////////////////////
const greeting =              require('greeting');
const request =               require('request-promise');
const {createMachine} =       require('@xmachina/message')

// note to developer  -- this microservice is a simple model on how to invoke the message
// factory function for working with the data object that is passed in from
// Startegic Machine Messaging Platform ... and which needs to be returned

// See the @xmachina/message docs on npm for more information on the range of
// methods available to interrogate the data object and accomplish work

function main(obj) {

  // compose response or redirect
  return new Promise (function(resolve, reject){
          let result = {};
          console.log("---------Banter----------")


              // invoke the factory function which crates a 'state machine'
              // this 'machine' is stateless to begin ... but detects the state of dialogue
              // and helps to track progress
              const m = createMachine()

              // pass in the data object that the microservice receives from the messaging
              // platform. This action helps to set the state of the 'finite state machine'


              m.updateWorkObj(obj)         // intialize the machine with the data object

              // a range of functions are now available to interrogate the object
              // and perform other actions

              let args = m.getWorkObj()

              // begin to capture key data to pass back as part of the response
              result.sender = args.message.From
              result.orgmessage = args

              // the reply array will capture the agent's responses to the text
              result.reply = []

              wat(args, (response) => {
                  result.reply = response.slice()

                // the response object must be recorded (validated) by the machine ... before
                // the updated data object retrieved and returned as the final step
                // of the microservice

                  m.setResponse(result)
                  let newObj = m.getWorkObj()
                  resolve(newObj)

              })


        //  result.reply.push({'link': 'http://www.example.com/'})
    })
  }

//respond returns a string
function wat(args, cb) {
  let interactions = ["hmmm. I didn't understand that. Please try again", "I am here to talk about toys", "Wat? I am stumped. ", "You said "]
  let response = []
  let msg = {
    msg: ""
  }
  let newObj = {}
  // TESTING - TEMPORARY VALUES
  //let t = args.sequenceCnt
  //let v = args.obj.dialogue.sequenceCnt
  let t = 2
  let v = 1
  switch(t) {
    case 0:
      msg.msg = "This is interaction " + t + " which seems a little low"
      response.push(msg)
      cb(response)
      break;
    case 1:
      msg.msg = interactions[0]
      newObj = Object.assign({}, msg)
      response.push(newObj)
      cb(response)
      break;
    case 2:
      msg.msg = interactions[3] + args.message.Body
      newObj = Object.assign({}, msg)
      response.push(newObj)
      msg.msg = interactions[1]
      newObj = Object.assign({}, msg)
      response.push(newObj)
      cb(response)
      break;
    //
    case 3:
      msg.msg = "This is interaction " + t + " Ask for my toy catalogue!"
      response.push(msg)
      cb(response)
      break;

    default:
      msg.msg = interactions[2]
      newObj = Object.assign({}, msg)
      response.push(newObj)
      msg.msg = interactions[3] + + args.text
      newObj = Object.assign({}, msg)
      response.push(newObj)
      cb(response)
      break;
  }

};

exports.handler = main;
