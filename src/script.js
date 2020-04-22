const callbacks = {
  fetchData: function (callback) {
    let data;
    /* 일부 데이터를 가져오는 코드 */
    data = 'peanut butter';
    callback(data);
  }
};

const promises = {
  fetchData: () => {
    return new Promise(function (resolve, reject) {
      let data;
      setTimeout(() => {
        data = 'peanut butter';
        resolve(data);
      }, 50);
      setTimeout(() => {
        if (data === undefined) {
          reject('error');
        }
      }, 100);
    });
  }
};


module.exports = { callbacks, promises };