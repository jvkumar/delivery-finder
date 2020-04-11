//------------------------------------------------------
//-----------PUT YOUR CONFIGURATION HERE----------------
//------------------------------------------------------
const instacart_cookie = 'ahoy_visitor=dd430fa8-4576-4cfc-ac0d-b0ce56d8abe4; ajs_group_id=null; ajs_anonymous_id=%22d7cd4b09-47de-4074-8a5d-a7178244e91f%22; _gcl_au=1.1.22805689.1583037348; _gcl_aw=GCL.1583037358.Cj0KCQiAtOjyBRC0ARIsAIpJyGMx5WLFQk_DQZEufMjw8zkuNZcGdH-Q3q8LNm8GxJ6LbqwmgRyFLKEaAuD6EALw_wcB; node_ssr_initial_bundle=false; __stripe_mid=5546d9f3-2d76-476f-887b-b6c8eaaa4a1e; ftr_ncd=6; _instacart_logged_in=1; ab.storage.userId.6f8d91cb-99e4-4ad7-ae83-652c2a2c845d=%7B%22g%22%3A%2229118633%22%2C%22c%22%3A1583037430344%2C%22l%22%3A1583037430344%7D; ab.storage.deviceId.6f8d91cb-99e4-4ad7-ae83-652c2a2c845d=%7B%22g%22%3A%226ae816fa-6eca-5902-7074-6ae895186d17%22%2C%22c%22%3A1583037430346%2C%22l%22%3A1583037430346%7D; __ssid=607a856a44bfc3426f6588f86bfe1ab; ajs_user_id=%2229118633%22; _derived_epik=dj0yJnU9a2pPVGxUMUZUUHc4cGRILUVCSG9pMTVjam5WMzRXOEUmbj1RazBSc2QtRDZoNGQxWFJFclJSbkhBJm09MSZ0PUFBQUFBRjV2MXpZJnJtPTEmcnQ9QUFBQUFGNXYxelk; remember_user_token=W1syOTExODYzM10sIiQyYSQxMCRPUWguWTZxbkhNVkNqcFJvVWkzQVBPIiwiMTU4NDkzNTAxNC41NzUyODQyIl0%3D--36114365f3e856e7e16d84bc7a00f0d2988c005a; amplitude_idundefinedinstacart.com=eyJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOm51bGwsImxhc3RFdmVudFRpbWUiOm51bGwsImV2ZW50SWQiOjAsImlkZW50aWZ5SWQiOjAsInNlcXVlbmNlTnVtYmVyIjowfQ==; ahoy_visit=5a255ac9-0b9e-4e42-89fa-bd7a42a10b6e; forterToken=346404e497f44a5f8c53abe856e13b44_1586309021621__UDF43_9ck; ab.storage.sessionId.6f8d91cb-99e4-4ad7-ae83-652c2a2c845d=%7B%22g%22%3A%22b71f30a9-0687-d2ce-7673-9b8fd3f1f746%22%2C%22e%22%3A1586310823569%2C%22c%22%3A1586308726334%2C%22l%22%3A1586309023569%7D; build_sha=97ed9c220f621ba93d6e54093c7ffc7e35fe2642; amplitude_id_b87e0e586f364c2c189272540d489b01instacart.com=eyJkZXZpY2VJZCI6IjU3MzhlNGMyLTM5YzAtNDAyYi04ZWRkLTNkYjFmNWFjMjVhMVIiLCJ1c2VySWQiOiIyOTExODYzMyIsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTU4NjMxMTA2NDc1OSwibGFzdEV2ZW50VGltZSI6MTU4NjMxMTk2NDUwMywiZXZlbnRJZCI6ODkwLCJpZGVudGlmeUlkIjozMCwic2VxdWVuY2VOdW1iZXIiOjkyMH0=; _instacart_session=U0lXdVZmN3hUZDFvK094WFh5bjAwbTVIYW9KWk1SWFJxUVA4SjMrSTQ2NzRkOEVZbDFCYzkwb3FDcFI5OHhkcmZyTzVYSVFScXhWMmQzMW40dzRsckdaWWZyK3JEOFlJOXYwVVM1bDQ1Mzk1N0xBcTZUSFhmNjR4eTdyV0JqV1dXUEJsMWd4OFpHaUJCK1BTTlJMaG5sWjBQUEJ2ditkMHQwSVVoYmU2ZVROa2J3ZDdJa0JBQXVyYmg3UHZxUThOaXBUMjVodzNKR2JOSERtS250WkJ4YUdlS2dEWWFRZE9Va1haSGZqWmlaZnhmOVVTdmc5U2NBZ0hpVmt5SGVxbS0tam9RaFdJN3dmYkp0c25KakFXRkl4UT09--e0015f566463dbe334e9a9015c5449a58d3f7f00; build_sha=e61cfe307ddfd5acc25f2da44f9518699a8a19c8';
const cache_key  = '0d72bc-3650-t-c43';
const address_id = '75415821';
let   checking_frequency_in_minutes = 3; //Minimum value is 3 minutes



//------------------------------------------------------
//-----------DO NOT EDIT BELOW THIS LINE----------------
//------------------------------------------------------
const sleep     = require('sleep');
const https     = require('https')
const player    = require('play-sound')();
const min_freq  = 3;

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
