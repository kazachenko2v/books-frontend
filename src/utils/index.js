function descendingComparator(a, b, orderBy) {
  let first = a[orderBy];
  let second = b[orderBy];
  if (orderBy === "total") {
    first = parseInt(first);
    second = parseInt(second);
  }
  if (orderBy === "delivery_date") {
    first = new Date(first).getTime();
    second = new Date(second).getTime();
  }
  if (second < first) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0],
    month = datePart[1].length < 2 ? "0" + datePart[1] : datePart[1],
    day = datePart[2].length < 2 ? "0" + datePart[2] : datePart[2];

  return day + "/" + month + "/" + year;
}

export function valueSumm(arr, value) {
  return arr
    .filter((el) => el)
    .map((row) => row[value])
    .reduce((a, b) => a + b, 0);
}

export function getSelectedNames(arr, selected) {
  return selected
    .map((id) => {
      return arr.map((row) => (row.id === id ? row.name : null));
    })
    .flat()
    .filter((el) => el);
}
