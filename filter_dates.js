
// save starting date
const startDate = new Date("2015-08-04")
// save ending date
const endDate = new Date("2015-08-12")

// declare function that returns items that match date range as long as they return true
const resultProductData = product_data.filter(function (a) {
  // this variable assigns the date of each item in the object
  const hitDates = a.ProductHits || {}
  // extract all date strings and put in an array
  hitDates = Object.keys(hitDates)
  // improvement: use some. this is an improment because .map()
  // and .filter() are walking through all elements.
  // .some() stops this process if one item is found that returns true in the callback function and returns true for the whole expression
  hitDateMatchExists = hitDates.some(function(dateStr) {
    // converts each date string to date format as it checks to see if it exists in the range
      const date = new Date(dateStr)
      // return true for dates within the range
      return date >= startDate && date <= endDate
  })
  return hitDateMatchExists
})
