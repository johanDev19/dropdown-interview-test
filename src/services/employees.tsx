import mockData from "../mocks/input-values";

export async function getEmployees(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
}
