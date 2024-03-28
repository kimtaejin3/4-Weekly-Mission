export function filterData<T extends { [key in keyof T]: string }>({
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
      if (!listItem[targetKey]) {
        return;
      }

      if (listItem[targetKey].includes(keyword)) {
        operation = 1;
      }
    });

    return operation;
  });
}
