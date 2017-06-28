import firebase from 'firebase';
import _ from 'lodash';

import Utils from './utils';

class ProductsService {

  getProducts(category) {
    return new Promise((resolve, reject) => {

      firebase.database().ref('products').orderByChild('category').equalTo(category)
        .once('value',
          (snapshot) => {

            const data = snapshot.val() || {};
            const products = Utils.makeArray(data).map(item => {
              return Object.assign({}, item, {
                price: (item.price !== 'unknown' ? parseFloat(item.price) : 0),
                reviews: Utils.makeArray(item.reviews || {})
              });
            });

            resolve(_.sortBy(products, ['name']));

          },
          (error) => reject(error)
        );

    });
  }

  getProductDetails(category, slug) {
    return new Promise((resolve, reject) => {

      firebase.database().ref('products').orderByChild('category').equalTo(category)
        .once('value',
          (snapshot) => {

            const data = snapshot.val() || {};

            const products = Utils.makeArray(data);
            const product = products.find(item => item.slug === slug);

            if (product) {

              product.price = (product.price !== 'unknown' ? parseFloat(product.price) : 0);
              product.relatedProducts = this.getRelatedProducts(product, products);
              product.reviews = Utils.makeArray(product.reviews || {});

              return resolve(product);

            }

            return reject(new Error('Product not found'));

          },
          (error) => reject(error)
        );

    });
  }

  getRelatedProducts(product, products) {

    const productClass = product.specs.find(item => item.label === 'Class');

    let relatedProducts = products
      .filter(item => {
        const itemClass = item.specs.find(spec => spec.label === 'Class');
        return (item.id !== product.id && productClass.label === itemClass.label);
      })
      .map(item => {
        return Object.assign({}, item, {
          price: (item.price !== 'unknown' ? parseFloat(item.price) : 0),
          reviews: Utils.makeArray(item.reviews || {})
        });
      });

    relatedProducts = _.shuffle(relatedProducts).slice(0, 4);

    return relatedProducts;

  }

}

export default new ProductsService();
