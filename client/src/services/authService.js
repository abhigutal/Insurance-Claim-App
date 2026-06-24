import axios from "axios";


const API = "http://localhost:8080";



const authService = {



register: async (userData) => {

  const response =
    await axios.post(
      `${API}/insurances`,
      {

        fullName: userData.fullName,

        email: userData.email,

        mobile: userData.mobile,

        adhaar: userData.adhaar,

        dob: userData.dob,

        gender: userData.gender,

        address: userData.address,

        username: userData.username,

        password: userData.password

      }
    );


  return response.data;

},





login: async(loginData)=>{


const response =
await axios.post(
`${API}/login`,
{

identifier:
loginData.identifier,


password:
loginData.password

});


return response.data;


}



};



export default authService;