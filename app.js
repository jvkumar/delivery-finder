//------------------------------------------------------
//----------- PUT YOUR CONFIGURATION HERE ----------------
//------------------------------------------------------
const instacart_cookie = 'XXXXX'; //replace XXXXX with value of `cookie` you collected in Step 6
const cache_key  = 'XXXXX'; //replace XXXXX with value of `cache_key` you collected in Step 6
const address_id = 'XXXXX'; //replace XXXXX with value of `address_id` you collected in Step 6
let   checking_frequency_in_minutes = 1; //Minimum value is 1 minute


//------------------------------------------------------
//----------- DO NOT EDIT BELOW THIS LINE ----------------
//------------------------------------------------------
const sleep     = require('sleep');
const https     = require('https')
const player    = require('play-sound')();
const min_freq  = 1;

function beep() {
  player.play('beep.mp3', function (err) {
    return;
  });
}

function pingInstacart(freq_interval, confirm_config) {
  const instacartUrl = `https://www.instacart.com/v3/retailers/1/delivery_options?source=web&cache_key=${cache_key}&address_id=${address_id}`;
  const options = {
    headers: {'Cookie': instacart_cookie}
  }
  
  const req = https.get(instacartUrl, options, resp => {
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
      if (resp.statusCode != 200){
        console.log("** FAILED ** YOU HAVE INCORRECT VALUE OF CONFIGURATIONS")
        console.log(JSON.parse(data).error);
        console.log("Make sure you have correct value of instacart_cookie, cache_key and address_id in the top 3 lines of app.js")
        return;
      } else {
        if (confirm_config) {
          console.log("** SUCCESS ** YOUR CONFIGURATION VALUES ARE CORRECT, NOW LET THE FINDER FIND AND ALERT YOU. MAKE SURE YOU KEEP THIS TERMINAL WINDOW OPEN WITH YOUR LAPTOP SOUND AT MAX");
          console.log("--------------------------------------------------------------------");
        }
      }

      let responseString = JSON.stringify(data);
      if(responseString.indexOf('green_window') > -1) {
        console.log(`${new Date().toString()} - ******** WOHOOOO FOUND A DELIVERY WINDOW *********`);
        while(true) {
          beep(); 
          sleep.sleep(2);
        }
      } else {
        console.log(`${new Date().toString()} - No delivery window found. Next check in ${freq_interval} minutes`);
        sleep.sleep(freq_interval*60);
        pingInstacart(freq_interval, false);
      }
    });
    
  });

  //On error
  req.on('error', error => {
    console.error(error);
  });

  req.end();
}

//Don't bombard instacart by checkign in every less than min_freq minutes
checking_frequency_in_minutes = (checking_frequency_in_minutes < min_freq) ? min_freq : checking_frequency_in_minutes;
console.log(`
Starting the Delivery time finder with this configuration:
--------------------------------------------------------------------
instacart_cookie = ${instacart_cookie}

cache_key = ${cache_key}

address_id = ${address_id}

checking_frequency_in_minutes = ${checking_frequency_in_minutes}
--------------------------------------------------------------------
`);
pingInstacart(checking_frequency_in_minutes, true);
