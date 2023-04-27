export const cacheUser = (infoUser) => {
    return {
        type: 'CACHE_USER',
        payload: infoUser
    }
};