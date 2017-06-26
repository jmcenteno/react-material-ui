import firebase from 'firebase';
import _ from 'lodash';

class ReviewsService {

  getReviews(slug) {
    return new Promise((resolve, reject) => {

      firebase.database().ref('products').orderByChild('slug').equalTo(slug)
        .once('value',
          (productSnapshot) => {

            const keys = Object.keys(productSnapshot.val() || {});

            if (keys.length) {

              firebase.database().ref(`reviews/${ keys[0] }`)
                .once('value',
                  (reviewsSnapshot) => {

                    const data = reviewsSnapshot.val() || {};

                    const reviews = Object.keys(data).map(key => {
                      return Object.assign({}, data[key], {
                        key
                      });
                    });

                    resolve(_.sortBy(reviews, ['created']));

                  }
                );

            } else {

              resolve([]);

            }

          },
          (error) => reject(error)
        );

    });
  }

  createReview(review) {
    return new Promise((resolve, reject) => {

      const ref = firebase.database().ref(`reviews/${ review.product }`);

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
