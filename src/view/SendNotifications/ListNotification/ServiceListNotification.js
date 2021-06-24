export const handleData = (data, apart) => {
    //console.log(data);
    const newdata = [];
    for (let i = 0; i < data.length; i++) {
        let createdate = new Date(data[i].create_date);
        newdata[i] = {
          id: data[i]._id,
          order: i + 1,
          date:
            createdate.getDate() +
            "/" +
            (createdate.getMonth() + 1) +
            "/" +
            createdate.getFullYear(),
        title:data[i].title
    
        };
      }
    return newdata;
  };