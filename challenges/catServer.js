const request = require('../utils/server');


const checkServerStatus = (cb) => {
  request('/status', cb)
}


const fetchAllOwners = (cb) => {
  request('/owners', (err, owners) => {
    if(err) cb(err);
    else cb(err, owners);
  })
}

const fetchCatsByOwner = (owner, cb) => {
  request(`/owners/${owner}/cats`, (err, cats) => {
    if(err) cb(err);
    else cb(err, cats)
  })
}

const fetchAllCats = (cb) => {
  fetchAllOwners((err, owners) => {
    const allCats = []
    let ownerCount = owners.length;
    owners.forEach(owner => {
      fetchCatsByOwner(owner, (err, cats) => {
        allCats.push(...cats)
        if(!--ownerCount) cb(null, allCats)
      }) 
    })
  })
}

const fetchOwnersWithCats = (cb) => {
  fetchAllOwners((err, owners) => {
    const ownersWithCats = [];
    let ownerCount = owners.length;
    owners.forEach((owner, i) => {
      fetchCatsByOwner(owner, (err, cat) => {
        ownersWithCats[i] = {owner, cat};
        if(!--ownerCount) cb(null, ownersWithCats)
      })
    })
  })
}


console.log(checkServerStatus())