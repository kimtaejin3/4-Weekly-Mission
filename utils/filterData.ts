export function filterData<T extends { [key: string]: string }>({
  list,
  targetKeys,
  keyword,
}: {
  list: T[];
  targetKeys: (keyof T)[];
  keyword: string;
}) {
  return list.filter((listItem) => {
    let operation = 0;

    targetKeys.forEach((targetKey) => {
      if ((listItem[targetKey] as string).includes(keyword)) {
        operation = 1;
      }
    });

    return operation;
  });
}

filterData({
  list: [{ name: "a", age: "1" }],
  targetKeys: ["name"],
  keyword: "ad",
});
