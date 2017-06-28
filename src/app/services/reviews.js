import firebase from 'firebase';
import _ from 'lodash';

import Utils from './utils';

class ReviewsService {

  getReviews(productKey) {
    return new Promise((resolve, reject) => {

      firebase.database().ref(`products/${productKey}/reviews`)
        .once('value',
          (productSnapshot) => {

            const reviews = Utils.makeArray(productSnapshot.val() || {});

            resolve(_.sortBy(reviews, ['created']).reverse());

          },
          (error) => reject(error)
        );

    });
  }

  createReview(productKey, review) {
    return new Promise((resolve, reject) => {

      const ref = firebase.database().ref(`products/${ productKey }/reviews`);

      ref.push(review)
        .then(() => {

          ref.once('value',
            (snapshot) => resolve(snapshot.val() || []),
            () => resolve([])
          );

        })
        .catch((error) => reject(error));

    });
  }

}

export default new ReviewsService();
