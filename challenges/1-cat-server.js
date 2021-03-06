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

const fetchAllCats = callback => {
  let array = [];
  let count = 0;
  fetchAllOwners(function(error, names) {
    names.forEach(name =>
      fetchCatsByOwner(name, function(error, cats) {
        array.push(...cats);
        count++;
        if (count === names.length) {
          array.sort();
          callback(null, array);
        }
      })
    );
  });
};

const fetchOwnersWithCats = callback => {
  let ownersWithCats = [];
  let catReponses = 0;
  fetchAllOwners((error, ownerNames) => {
    ownerNames.forEach((ownerName, index) => {
      fetchCatsByOwner(ownerName, (error, cats) => {
        catReponses++;
        const catInfo = {
          owner: `${ownerName[0].toUpperCase()}${ownerName.slice(1)}`,
          cats
        };
        ownersWithCats[index] = catInfo;
        if (ownerNames.length === catReponses) callback(null, ownersWithCats);
      });
    });
  });
};

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
