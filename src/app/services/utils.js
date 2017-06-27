class Utils {

  formatCurrency(input) {

    if (input === 0 || Number.isNaN(input)) {
      return 'Not Available';
    }

    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(input);

  }

  makeArray(obj) {

    return Object.keys(obj).map(key => {
      return Object.assign({}, obj[key], { key });
    });

  }

  calculateRatings(reviews) {

    const total = reviews.map((item) => item.stars).reduce((a, b) => a + b, 0);

    return Math.round(total / reviews.length);

  }

  filterDataSet(rows = [], filter = '', keys = []) {

    if (!rows) {
      return [];
    }

    if (!rows.length) {
      return rows;
    }

    const regEx = new RegExp(escape(filter.toString().toLowerCase()));
    const filterKeys = keys || Object.keys(rows[0]);

    const filteredData = rows.filter((item) => {
      for (let i = 0; i < filterKeys.length; i++) {
        if (item[filterKeys[i]] == null || item[filterKeys[i]] === undefined) continue;
        if (regEx.test(escape(item[filterKeys[i]].toString().toLowerCase()))) {
          return true;
        }
      }
      return false;
    });

    return filteredData;

  }

}

export default new Utils();
