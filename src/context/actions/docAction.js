export const cacheDocuments = (docList) => {
  return {
    type: "CACHE_DOCUMENTS",
    payload: docList,
  };
};

export const cacheSoumissions = (soumissions) => {
    return {
        type: 'CACHE_SOUMISSIONS',
        payload: soumissions
    }
};

export const cacheChamps = (champs) => {
    return {
        type: 'CACHE_CHAMPS',
        payload: champs
    }
};

export const cacheResponses = (responses) => {
  return {
      type: 'CACHE_RESPONSES',
      payload: responses
  }
};
