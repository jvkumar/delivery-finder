// ---------------------------------------------------------------------
// ---------PUT YOUR CONFIGURATION HERE OF YOUR DESIRED RETAILER--------
// ---------------------------------------------------------------------
// Cookies in this case can be thousands of characters. Please put all of it here.
// to find availability in Instacart, replace XXXXX with value of `cookie` you collected in Step 3
const instacart = {
  cookie: "XXXXX"
}
// to find availability in Amazon Wholes Food, replace XXXXX with value of `cookie` you collected in Step 3
const amazonWholefoods = {
  cookie: 'XXXXX'
}
// to find availability in Amazon Fresh, replace XXXXX with value of `cookie` you collected in Step 3
const amazonFresh = {
  cookie: "XXXXX"
}
// to find availability in Costco Sameday, replace XXXXX with value of `cookie` you collected in Step 3
const costcoSameday = {
  cookie: "XXXXX"
}

// to find availability in Walmart Groceries, replace XXXXX with value of `cookie`, `cart id` & `store id` you collected in Step 3
const walmartGroceries = {
  cookie: "XXXXX",
  store_id: "XXXXX",
  cart_id: "XXXXX"
}

module.exports.getAuthConfig = () => {
  return {
    amazonwholefoods: amazonWholefoods,
    instacart: instacart,
    costcosameday: costcoSameday,
    amazonfresh: amazonFresh,
    walmartgroceries: walmartGroceries
  }
}
