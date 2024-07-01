import axios from "axios";

export async function uploadResource(formData: FormData) {
  const data =  await axios.post('http://localhost:2001/api', formData);
  return data.data;
}
