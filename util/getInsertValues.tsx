function getInsertValues(data: any) {
  const arr: any = [];

  data.map((item: any) => {
    return arr.push(`("${item.name}","${item.quantity}","${item.price}")`);
  });

  return arr.toString();
}

export default getInsertValues;
