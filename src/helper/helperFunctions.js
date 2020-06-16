const calculateRating = array => {
  const totalRatingObj = array.reduce((acc, curr) => ({
    rating: acc.rating + curr.rating
  }));
  return totalRatingObj.rating / array.length;
};

module.exports = { calculateRating };
