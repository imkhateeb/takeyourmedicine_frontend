import axios from "axios";

const url = 'http://localhost:5000/api/get-all-caretaker';
const headers = { 'Content-Type': 'application/json' };

const getAllCaretaker = async () => {
   try {
      const response = await axios.get(url, { headers });
      if (response.data.success) {
         return response.data.caretakers;
      } else {
         return null;
      }
   } catch (error) {
      return null;
   }
}

export default getAllCaretaker;