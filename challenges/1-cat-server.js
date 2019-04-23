const request = require('../utils/server');
const { writeFile } = require('fs');

const checkServerStatus = callback => {
  request('/status', function(error, output) {
    callback(error, output);
  });
};

const fetchBannerContent = callback => {
  request('/banner', function(error, update) {
    update.copyrightYear = 2019;
    callback(error, update);
  });
};

const fetchAllOwners = callback => {
  request('/owners', function(error, names) {
    const name = names
      .join(' ')
      .toLowerCase()
      .split(' ');
    callback(error, name);
  });
};

const fetchCatPics = (catPics, callback) => {
  let newArr = [];
  if (catPics.length < 1) {
    callback(null);
  }
  catPics.forEach(catPic => {
    request('/pics/' + `${catPic}`, function(error, cats) {
      if (error !== null) {
        newArr.push('placeholder.jpg');
      } else {
        newArr.push(cats);
      }
      if (newArr === []) {
      }
      if (newArr.length === catPics.length) {
        console.log(error);
        console.log(newArr);
        callback(error, newArr);
      }
    });
  });
};

const fetchCatsByOwner = (name, callback) => {
  request('/owners/' + `${name}` + '/cats', function(error, cats) {
    callback(error, cats);
  });
};

const fetchAllCats = () => {};

const fetchOwnersWithCats = () => {};

const kickLegacyServerUntilItWorks = () => {};

const buySingleOutfit = () => {};

module.exports = {
  buySingleOutfit,
  checkServerStatus,
  kickLegacyServerUntilItWorks,
  fetchAllCats,
  fetchCatPics,
  fetchAllOwners,
  fetchBannerContent,
  fetchOwnersWithCats,
  fetchCatsByOwner
};
