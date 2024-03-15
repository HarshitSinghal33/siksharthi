export default function changeLocalStorage(property, value) {
  const localStorageData = localStorage.getItem('userAppData');
  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);
    parsedData[property] = value;
    const updatedData = JSON.stringify(parsedData);
    localStorage.setItem('userAppData', updatedData)
  }
}