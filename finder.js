
// ---------------------------------------------------------------------
// ---------------------DO NOT EDIT BELOW THIS LINE---------------------
// ---------------------------------------------------------------------
const authConfig = require('./config/auth').getAuthConfig()
const { AMAZON_WHOLE_FOODS, INSTACART, COSTCO_SAME_DAY, AMAZON_FRESH, WALMART_GROCERIES } = require('./config/stores')

const retalierConfig = {
  amazonwholefoods: {
    label: 'Amazon Whole Foods',
    url: 'https://www.amazon.com/gp/buy/shipoptionselect/handlers/display.html?hasWorkingJavascript=1',
    signature: 'Next available',
    responseDataType: 'html',
    auth: authConfig[AMAZON_WHOLE_FOODS],
    cookie: authConfig[AMAZON_WHOLE_FOODS].cookie,
    cookieStr: 'amazonWholefoodsCookie'
  },
  instacart: {
    label: 'InstaCart',
    url: 'https://www.instacart.com/v3/retailers/1/delivery_options?source=web`',
    signature: 'green_window',
    responseDataType: 'json',
    auth: authConfig[INSTACART],
    cookie: authConfig[INSTACART].cookie,
    cookieStr: 'instacartCookie'
  },
  costcosameday: {
    label: 'Costco Sameday',
    url: 'https://sameday.costco.com/v3/retailers/5/delivery_options?source=web`',
    signature: 'green_window',
    responseDataType: 'json',
    auth: authConfig[COSTCO_SAME_DAY],
    cookie: authConfig[COSTCO_SAME_DAY].cookie,
    cookieStr: 'costcoSamedayCookie'
  },
  amazonfresh: {
    label: 'Amazon Fresh',
    url: '',
    signature: '',
    responseDataType: '',
    auth: authConfig[AMAZON_FRESH],
    cookie: authConfig[AMAZON_FRESH].cookie,
    cookieStr: 'amazonFreshCookie'
  },
  walmartgroceriespickup: {
    label: 'Walmart Groceries - Pickup',
    url: `https://grocery.walmart.com/v4/api/accessPoints/${authConfig[WALMART_GROCERIES].store_id}/slots?cartId=${authConfig[WALMART_GROCERIES].cart_id}&fulfillmentType=INSTORE_PICKUP&express=true&mergedSlots=true&restrictedSlots=true`,
    signature: '\\"available\\":true',
    responseDataType: 'json',
    auth: authConfig[WALMART_GROCERIES],
    cookie: authConfig[WALMART_GROCERIES].cookie,
    cookieStr: 'walmartGroceriesCookie'
  },
  walmartgroceriesdelivery: {
    label: 'Walmart Groceries - Delivery',
    url: `https://grocery.walmart.com/v4/api/accessPoints/${authConfig[WALMART_GROCERIES].store_id}/slots?contractId=${authConfig[WALMART_GROCERIES].cart_id}&fulfillmentType=DELIVERY&express=true&mergedSlots=true&restrictedSlots=true`,
    signature: '\\"available\\":true',
    responseDataType: 'json',
    auth: authConfig.walmartgroceries,
    cookie: authConfig[WALMART_GROCERIES].cookie,
    cookieStr: 'walmartGroceriesCookie'
  }
}

const sleep = require('sleep')
const https = require('https')
const player = require('play-sound')()
let   checkingInEveryXminutes = 1
const minFrequency = 1 // Minimum value is 1 minute

// Don't bombard by checking in every less than minFrequency minute(s)
checkingInEveryXminutes = (checkingInEveryXminutes < minFrequency) ? minFrequency : checkingInEveryXminutes

// Accept the command line argument
let retailerNamePassed = (process.argv.slice(2)[0])
const retailerNames = Object.keys(retalierConfig)
if (retailerNamePassed) {
  if (!retailerNames.includes(retailerNamePassed.substring(1))) {
    console.log(`Invalid retailer name. It must be one of these ${retailerNames.toString()}`)
    process.exit(4)
  } else {
    retailerNamePassed = retailerNamePassed.substring(1)
  }
} else {
  console.log(`Missing the retailer name. It must be one of these ${retailerNames.toString()}`)
  process.exit(5)
}

const retailer = retalierConfig[retailerNamePassed]

function beep () {
  player.play('beep.mp3', function (err) {

  })
}

function pingRetailer (retailer, freqInterval, confirmConfig) {
  const options = {
    headers: {
      cookie: retailer.cookie
    }
  }

  const req = https.get(retailer.url, options, resp => {
    let data = ''

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received.
    resp.on('end', () => {
      let responseString = ''
      if (resp.statusCode != 200) {
        if (confirmConfig) {
          console.error(`** FAILED (CODE1) ** YOU HAVE INCORRECT VALUE OF ${retailer.cookieStr} AT THE TOP LINE OF finder.js`)
        }
        console.error(`Response code: ${resp.statusCode}`)
        if (retailer.responseDataType == 'json') {
          try { // https://nodejs.org/en/knowledge/errors/what-is-try-catch/#but-wait-isn-t-it-node-js-convention-to-not-use-try-catch
            // Notorious JSON parsing - but not a show stopper.
            console.error(JSON.parse(data))
          } catch (e) {
            console.log(e)
          }
        } else {
          console.error(data)
        }
        if (confirmConfig) { // return only first time, else continue
          return
        } else {
          console.log('Retailers server encountered some hiccup, so waiting for 2 minutes before restarting with hope server will recover. If this message keeps showing for more than 5 times, then manually kill the script and start again. In rare case, retailer may expire the cookie, if that is the case, then re-collect the cookie and enter in config/auth.js again.')
          // Hoping server response may recover, so lets sleep for 2 minutes, and then restart with user input sleep timing
          sleep.sleep(2 * 60)
        }
      } else if (retailer.cookieStr == 'amazonWholefoodsCookie') {
        // Amazon wholesfood has different check - it returns 200 even cookie is wrong, so need to check the presence of this string
        if (!data.includes('Select a day')) {
          console.error(`** FAILED (CODE2) ** YOU HAVE INCORRECT VALUE OF ${retailer.cookieStr} AT THE TOP LINE OF finder.js`)
          return
        }
      } else {
        if (confirmConfig) {
          console.log(`** SUCCESS ** YOUR COOKIE VALUE OF ${retailer.cookieStr} IS CORRECT, NOW LET THE FINDER FIND AND ALERT YOU. MAKE SURE YOU KEEP THIS TERMINAL WINDOW & CHECKOUT PAGE OPEN WITH YOUR LAPTOP SOUND AT MAX`)
          console.log('--------------------------------------------------------------------')
        }
      }

      if (retailer.responseDataType == 'json') {
        responseString = JSON.stringify(data)
      } else {
        const responseString = data
      }
      
      if (responseString.indexOf(retailer.signature) > -1) {
        console.log(`${new Date().toString()} - ******** WOHOOOO FOUND A DELIVERY WINDOW, GO TO YOUR ALREADY OPENED CART WEB PAGE AND REFRESH THE PAGE TO SEE AVAILABLE WINDOWS *********`)
        while (true) {
          beep()
          sleep.sleep(2)
        }
      } else {
        console.log(`${new Date().toString()} - No delivery window found for ${retailer.label}, using cookie value of ${retailer.cookieStr}. Next check in ${freqInterval} minute(s)`)
        sleep.sleep(freqInterval * 60)
        pingRetailer(retailer, freqInterval, false)
      }
    })
  })

  // On error
  req.on('error', error => {
    console.error(error)
  })

  req.end()
}

console.log(`
Starting the Delivery finder for ${retailer.label} with this configuration:
----------------------------------------------------------------------------------
URL =====> ${retailer.url}
checkingInEveryXminutes =====> ${checkingInEveryXminutes} minute(s)
Cookie =====> ${retailer.cookie}
----------------------------------------------------------------------------------
`)

pingRetailer(retailer, checkingInEveryXminutes, true)
