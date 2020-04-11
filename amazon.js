//------------------------------------------------------
//-----------PUT YOUR CONFIGURATION HERE----------------
//------------------------------------------------------
const cookie = 'session-id=135-6643830-8538221; ubid-main=131-6050204-1007514; csrf=2134115345; x-wl-uid=1ZnuX6x3+f4GJgQeLj17BDs/CoEbEu4CekEDtdXhuyU7jgI1hpPTtcz1xlmpz996fiGoCfl05uPXJSUCVitrFIjEeUkyJ0JBeWf+Pgd6SCwmlF6Hk2ue0eIH8JkJOUcchLxZUj2xy+A8=; lc-main=en_US; aws-priv=eyJ2IjoxLCJldSI6MCwic3QiOjB9; aws-target-static-id=1578595672753-157691; s_fid=3F31319EB1E9C994-05DDDACDF4CDC296; regStatus=pre-register; aws-target-visitor-id=1578595672755-258953.28_0; aws-ubid-main=976-2310636-0787312; aws-session-id=689-8813094-3211412; x-main="qCvimoveIzp7?tv8ugWpZ2SEcA3bCZWV"; at-main=Atza|IwEBIADjx8eJQy1wgkpupD6BJUKIlMh5-LsApJVvQJKpyZdMUs3RwDZepcOXFNTjnFEOUr7iU-795-qwQBClk0RfyKpDpD4u55qVIVCU0m4_QGyt38qVHlZmhHwaxe-4wQFP6GlNA4fpTkFhW0EEdV7SV6X5dh7kfbtFD4ZcLQ76RpSLETbMpSmHA0KKRm2GwuBVfZEe3hHvskAKd44SaI2JFJQAJx4IuWmdp58ltm--AVXd8cziINTeJoQxkrW_EDhyc6jnJyiIEhtSEiCbAvSzpjcrg4BYSD_tdJCd2sL74SFuiHOnOTHXlFA-99d8gByHfqvrr8m0RtjthbhmWicMWrkFZzymonSfvJ76YUy9TQZISesPEPmElGsyemBsu3BTwoMyBoMWDwW7SFFqkwifh2-g; sess-at-main="FZJhOEyuvzyCR+KRCiNa60XpNEIsRWidULwTOyFA5kE="; sst-main=Sst1|PQHfxPqBVz3b_XvLiu30NscUC04AYDGxiRUjC2u6XTt4bWR_dJGVvemZ2Gj985zTdKTUnwLlLSJjMf6qp4LRv21RTqX5qcbqjGPsws1Mg_Vl0o55q-QckaJFJuDLLpW10r7fKQkbLs3baLkqdKr9qC2nl3vEX7vvmdppq0hhv4aK4SE3r_P8LndIPmbtAEyhl3OnkyPceuG1HhmhSO7BhDQB1elhB0VkkoUi3osXNptYVO4NTbvTbqIciaXvBhLKpLAptzk0mpgU6N59Cl2OSjmengLiETWRdDK7KACoHzzfIIPCUIpYTysLsbKAPc-KvUtdILX247Qy8pZjoeiYGfy_xg; i18n-prefs=USD; _mkto_trk=id:112-TZM-766&token:_mch-amazon.com-1585282510263-35742; aws-target-data=%7B%22support%22%3A%221%22%7D; s_vnum=2007961120067%26vn%3D9; aws-userInfo=%7B%22arn%22%3A%22arn%3Aaws%3Asts%3A%3A285428084862%3Aassumed-role%2Fokta_adm_role%2Fjaik%40splunk.local%22%2C%22alias%22%3A%22285428084862%22%2C%22username%22%3A%22assumed-role%252Fokta_adm_role%252Fjaik%2540splunk.local%22%2C%22keybase%22%3A%22vaODb0avUkLbDDYQbCSkpDljrI%2BYX2fM%2FCjI3HUAxRo%5Cu003d%22%2C%22issuer%22%3A%22http%3A%2F%2Fwww.okta.com%2F%22%2C%22signinType%22%3A%22PUBLIC%22%7D; aws-session-id-time=1586211633l; s_dslv=1586226839540; s_vn=1610131672952%26vn%3D15; s_nr=1586226839546-Repeat; session-id-time=2082787201l; skin=noskin; session-token=sG1NbHGQxRTP6MMOIvIvePkbqVoxUpnwvHEJY5wYIFsAVJmhlNwXEJ1nhnxn9fgXHcRpTHRhId92y1qFP8W3hjJF/Su61Rzm0UEbBF3o6N5TerVTKLbbN1zHBpiKEcjPnfRwyd0ZPhn/88NoizyI4DYZMhk7RN1RMJV1ATZppsV1b4h2LTvWU6TdRqkKbBRQx/CvYh1Z/B69f5+ldFHU2ak6zcoCGHNT6uAklknYsoHvznl/vr/DqhYhfPh21Yt6bxWoh7iQDOqcGPohEB1B9UucLKA/iZet; csm-hit=tb:s-ZF4NSBW9V29VE6KTGPTB|1586587090799&t:1586587090868&adb:adblk_yes; cdn-session=AK-7bba1d251c82877cc6ff7e632429f1a8; cdn-rid=F732C517586512B55023'; //replace XXXXX with value of `cookie` you collected in Step 6
let   checking_frequency_in_minutes = 1; //Minimum value is 1 minute
const string_to_check = 'No delivery windows available';

//------------------------------------------------------
//-----------DO NOT EDIT BELOW THIS LINE----------------
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
  const instacartUrl = `https://www.amazon.com/gp/buy/shipoptionselect/handlers/display.html?hasWorkingJavascript=1`;
  const options = {
    headers: {'Cookie': cookie}
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
        console.log("Make sure you have correct value of cookie in the top 3 lines of app.js")
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
