# delivery-finder
This is an effort to help people to get their groceries in this difficult time of COVID-19. This script helps you to find a delivery window of InstaCart (and Amazon `todo`) and alert you when it is available. 
`This is a barebone (non-optimized) script - a quick hack.`

# How to use this finder
## Step 0
*a)* Install `npm` and `nodejs`
Go to https://nodejs.org/en/ and download any version of the binary, that will be used for installing `node` as well as `npm`. Then double click the downloaded binary and follow the instructions to install `npm` as well as `node`

*b)* Download (or clone) this repo by clicking green "Clone or Download" button shown above. If you have downloaded, then unzip the downloaded folder (`delivery-finder-master`) and rename the folder to `delivery-finder` 

## Step 1
Assuming you are on Mac OS, so open a terminal window and create a folder, let's say, `covid19` 
```
$ mkdir covid19
$ cd covid19
```
Move the downloaded folder `delivery-finder`  (as done in Step0-b above) in `covid19` folder

## Step 2
Go to instacart.com and login and add all your items in the shopping cart.

## Step 3
Go to your cart page
![Follow this step](https://raw.githubusercontent.com/jvkumar/delivery-finder/master/readme/Step1.png)

## Step 4
On the checkout page, if there is no availability window, then you may see this page, then 
![follow these steps](
https://raw.githubusercontent.com/jvkumar/delivery-finder/master/readme/Step%202%20and%203.png)

## Step 5
Further 
![follow thsese steps](
https://github.com/jvkumar/delivery-finder/blob/master/readme/Step%204%20and%205.png)

## Step 6
From the previous step you must have values of
1. `cookie`
2. `cache_key`
3. `address_id`

## Step 7
*IMPORTANT* - Make sure you don't close the instacart checkout page ever when this finder is running. So let the page remain opened.

## Step 8
Go to `covid19` folder and then further go to `delivery-finder` subfolder where all this codebase is residing. 

## Step 9
In the `delivery-finder` folder, you would find a file called `app.js`. Open that file in any editor and at the top of the file, you will find keys `instacart_cookie`, `cache_key` and `address_id` on lines 4,5 and 6 respectively.
Replace `XXXXX` with the values which you got in step 6. Then save the file.

## Step 10
Now in the terminal window at `/covid19/delivery-finder` folder , run `app.js`
```
$ node app.js
```

You may see the output
```
** SUCCESS ** YOUR CONFIGURATION VALUES ARE CORRECT, NOW LET THE FINDER FIND AND ALERT YOU. MAKE SURE YOU KEEP THIS TERMINAL WINDOW OPEN WITH YOUR LAPTOP SOUND AT MAX
```

If you see any error, then it means you need to correctly put your values of keys 1. `cookie` 2. `cache_key` 3. `address_id`

That's all!!

## What to expect next.
This finder will keep checking the When there will be an availability, you may hear a buzzing sound. Then you just go to the opened instacart checkout page (as mentioned in step 7) and refresh it. You may see the availability window.

## Any developer wants to contribute?
You are welcome to send the PR

## Disclaimer
The author doesn't take any responsibility for any situation that may be the result of running this script. Please use at your own risk.


