'use strict';

///////////////////////////////////////
////////    index master       ///////
/////////////////////////////////////

//exports.banter =     require('./sm_banter/banter.js')
let handleBanter =    require('./sm_banter/banter.js').handler
exports.banter = handleBanter
