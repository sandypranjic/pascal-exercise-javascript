import axios from 'axios';

export const apiCall = (searchQuery, collection) => {
    const search = `${searchQuery} ${collection}`;
    if (searchQuery && collection) {
        return axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${search}&client_id=SQQgMgec18KujiGCQXh7U3R-woF0f-J3HI_DHhoOgzk`)
        .then(data => {
            return data.data;
        })
        .catch(err => {
            console.log('Error happened during fetching!', err);
        });
    }
}