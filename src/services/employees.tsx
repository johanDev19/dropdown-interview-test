import { Employee } from "../interfaces/employees";

export async function getEmployees(): Promise<Employee[]> {
  return fetch(
    "https://gist.githubusercontent.com/johanDev19/b21f47913ca1f2922d142be813717826/raw/2197f3604ded9ba9a8150d535909b5b998f63879/employeeList.json"
  )
    .then((res) => res.json())
    .then((res) => res.data);
}
