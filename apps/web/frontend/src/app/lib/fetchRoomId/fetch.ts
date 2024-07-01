export function fetchRoomId(formData: any) {
  fetch('http://localhost:2001/api', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.MESSAGE);
      return data.MESSAGE;
    })
    .catch((error) => console.error('Error uploading file:', error));

  return '';
}
