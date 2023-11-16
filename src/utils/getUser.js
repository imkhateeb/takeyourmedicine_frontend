// getUser.js
import axios from "axios";

const url = 'http://localhost:5000/api/get-user';

const getUser = async (token) => {
   const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };

   try {
      const response = await axios.get(url, { headers });
      if (response.data.success) {
         return response.data.user;
      } else {
         return null;
      }
   } catch (error) {
      return null;
   }
}

export default getUser;