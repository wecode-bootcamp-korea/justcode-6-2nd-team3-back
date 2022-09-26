const validatorValues = (body, haskey, res) => {
  const requireKey = Object.keys(haskey);

  Object.entries(body).forEach((keyValue) => {
      const [key, value] = keyValue;
      if (requireKey.includes(key) && value){
          haskey[key] = true;
      }
  })

  const haskeyArray = Object.entries(haskey);
  let err = '';
  for(let i =0; i<haskeyArray.length;i++){
      const [key, value] = haskeyArray[i];
      if(!value){
        err = key + '이/가 없습니다';
      }
  }

  return err;
};

module.exports = { validatorValues };