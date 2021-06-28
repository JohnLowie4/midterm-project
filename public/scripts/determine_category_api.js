const request = require("request");

//helper function to filter for the important categories that the app requires.
const getImportantCategories = (ele) => {
  if (
    ele.includes("books and literature") ||
    ele.includes("food and drink") ||
    ele.includes("shopping") ||
    ele.includes("finance") ||
    ele.includes("movies")
  ) {
    return true;
  }
  return false;
};

//get max key value pair helper function
getMax = (obj) => {
  const importantCategories = Object.keys(obj).filter(getImportantCategories);
  let max = obj[importantCategories[0]];
  let i;
  let max_i = 0;

  for (i = 1; i < importantCategories.length; i++) {
    let value = obj[importantCategories[i]];
    if (value > max) {
      max = value;
      max_i = i;
    }
  }
  return importantCategories[max_i];
};

//helper function to return one of the 4 categories outlined in the requirements
const getAppCategory = (apiCategory) => {
  if (apiCategory.includes("books and literature")) {
    return "toRead";
  }

  if (apiCategory.includes("food and drink")) {
    return "toEat";
  }

  if (apiCategory.includes("movies")) {
    return "toWatch";
  }

  if (apiCategory.includes("shopping") || apiCategory.includes("finance")) {
    return "toBuy";
  }
};

//fetch IP******************************
const classifyText = function (text) {
  request(
    `https://api.uclassify.com/v1/uclassify/iab-taxonomy-v2/classify?readkey=P9I1i40eO5An&text=${text}`,
    (error, response, body) => {
      if (error) {
        console.log(error.code);
        return error.code;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        console.log(msg);
        return msg;
      }

      const classify = JSON.parse(body);

      category = getAppCategory(getMax(classify));
      console.log(`${category}: ${text}`);
      return category;
    }
  );
};

classifyText("I want to eat at McDonalds");

classifyText("I want to buy a phone");

classifyText("I want to watch the avengers");

classifyText("I want to read Outliers");

classifyText("");
