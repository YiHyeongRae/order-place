function getInsertValues(data: any, date?: any) {
  const arr: any = [];

  if (date) {
    data.map((item: any) => {
      return arr.push(
        `("${item.name}","${item.quantity}","${item.price}","${date}")`
      );
    });
  } else {
    data.map((item: any) => {
      return arr.push(`("${item.name}","${item.quantity}","${item.price}")`);
    });
  }

  return arr.toString();
}

export default getInsertValues;
