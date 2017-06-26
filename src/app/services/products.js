import firebase from 'firebase';
import _ from 'lodash';

class ProductsService {

  getProducts(category) {
    return new Promise((resolve, reject) => {

      firebase.database().ref('products').orderByChild('category').equalTo(category)
        .once('value',
          (snapshot) => {

            const data = snapshot.val() || {};

            const products = Object.keys(data).map(key => {
              return Object.assign({}, data[key], {
                price: (data[key].price !== 'unknown' ? parseFloat(data[key].price) : 0)
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

            const products = Object.keys(data).map(key => Object.assign({}, data[key], { key }));
            const product = products.find(item => item.slug === slug);

            if (product) {

              product.price = (product.price !== 'unknown' ? parseFloat(product.price) : 0);

              const productClass = product.specs.find(item => item.label === 'Class');

              product.relatedProducts = products
                .filter(item => {
                  const itemClass = item.specs.find(spec => spec.label === 'Class');
                  return (item.id !== product.id && productClass.label === itemClass.label);
                })
                .map(item => {
                  return Object.assign({}, item, {
                    price: (item.price !== 'unknown' ? parseFloat(item.price) : 0)
                  });
                });

              product.relatedProducts = _.shuffle(product.relatedProducts).slice(0, 4);

              return resolve(product);

            }

            return reject(new Error('Product not found'));

          },
          (error) => reject(error)
        );

    });
  }

}

export default new ProductsService();
