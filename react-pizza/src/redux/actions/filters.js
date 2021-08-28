const setSortBy = (name) => ({
  type: 'SET_SORT_BY',
  payload: name,
});

const setCategory = (categoryIndex) => ({
  type: 'SET_CATEGORY',
  payload: categoryIndex,
});
