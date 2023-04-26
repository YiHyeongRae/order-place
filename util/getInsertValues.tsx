function getInsertValues(data: any, date?: any) {
  const arr: any = [];
  if (date) {
    data.map((item: any) => {
      return arr.push(
        `("${item.name}","${item.quantity}","${item.price}","${date}","${item.user_id}","n")`
      );
    });
  } else {
    data.map((item: any) => {
      return arr.push(
        `("${item.name}","${item.quantity}","${item.price}","${item.user_id}")`
      );
    });
  }

  return arr.toString();
}

export default getInsertValues;
