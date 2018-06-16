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


              m.updateWorkObj(obj)         // intialize work object with schema model

              // a range of functions are now available for us to interrogate the object
              // and perform other actions

              let args = m.getWorkObj()
              // begin to construct the response object
              result.sender = args.message.From
              result.orgmessage = args
              // get the agent response
              result.reply = []

              wat(args, (response) => {
                  result.reply = response.slice()
                //  resolve(result)

                // the reply of the agent must be recorded in the machine ... and
                // the updated data object retreived and returned as the final step
                // of the microservice

                  m.setAgentReply(result)
                  let newObj = m.getWorkObj()
                  resolve(newObj)
                  //return
              })


        //  result.reply.push({'link': 'http://www.example.com/'})
    })
  }

//respond returns a string
function respond(args, cb) {
  let interactions = ["Hey, great to hear from you ",
                      "This is text number ",
                      "Todays date is ",
                      "You said ",
                      "I am here to sell you a toy. If you need to speak to a live agent, just say so",
                      "Can I interest you in a toy? "]

  let response = []
  let msg = {
    msg: ""
  }
  let newObj = {}

  //let t = args.sequenceCnt
  //let v = args.obj.dialogue.sequenceCnt
  let t = 2
  let v = 1
  switch(t) {
    case 0:
      msg.msg = interactions[1] + t + " which seems a little low"
      response.push(msg)
      cb(response)
      break;
    case 1:
      msg.msg = interactions[0] + "Guest"
      newObj = Object.assign({}, msg)
      response.push(newObj)
      msg.msg = interactions[4]
      newObj = Object.assign({}, msg)
      response.push(newObj)
      cb(response)
      break;
    case 2:
      msg.msg = interactions[3] + "Default for right testing"
      newObj = Object.assign({}, msg)
      response.push(newObj)
      msg.msg = interactions[5]
      newObj = Object.assign({}, msg)
      response.push(newObj)
      cb(response)
      break;
    //
    case 3:
      msg.msg = interactions[1] + t + " which is a lot of texting"
      response.push(msg)
      cb(response)
      break;
    //
    case 4:
      msg.msg = interactions[2] + args.postdate
      response.push(msg)
      cb(response)
      break;

    default:
      msg.msg = interactions[1] + t
      newObj = Object.assign({}, msg)
      response.push(newObj)
      msg.msg = "When will this discussion end?"
      newObj = Object.assign({}, msg)
      response.push(newObj)
      cb(response)
      break;
  }

};
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
