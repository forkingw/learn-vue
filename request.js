axios.defaults.baseURL = 'https://developer.duyiedu.com/vue/bz';

axios.interceptors.response.use(function(response) {
    const { status } = response;
    const { url} = response.config;
    if (status === 200) {
        if (url === 'video') {
            return response.data;
        }
        return response.data.data;
    }
    return response;
}, function(error) {
    return Promise.reject(error);
})  