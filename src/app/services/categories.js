import firebase from 'firebase';

class CategoriesService {

  getCategories() {
    return new Promise((resolve, reject) => {

      firebase.database().ref('/categories')
        .once('value',
          (snapshot) => {

            let data = [];

            if (snapshot.val()) {

              const categories = snapshot.val();
              data = Object.keys(snapshot.val()).map(key => {
                return {
                  id: key,
                  name: categories[key].name
                };
              });

            }

            resolve(data);

          },
          (error) => reject(error)
        );

    });
  }

  getCategory(id) {
    return new Promise((resolve, reject) => {

      firebase.database().ref(`/categories/${id}`)
        .once('value')
        .then(data => {
          
          if (data) {
            resolve(data.val());
          } else {
            reject(new Error('Category not found'));
          }
        })
        //.catch(error => reject(error));

    });
  }

}

export default new CategoriesService();
