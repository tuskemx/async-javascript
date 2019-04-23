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
    callback(error, update)
  });
};


 

const fetchAllOwners = () => {};

const fetchCatPics = () => {};

const fetchCatsByOwner = () => {};

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
