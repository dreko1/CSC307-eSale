import axios from 'axios';

//When we have the backend running on a server, we will change this. For now, it runs on localhost.
const serverPath = "http://localhost:5000"

//This function concatenates the path paremeter with the server path, and makes a post call with the given data.
export async function makePostCall(path, data){
    try {
        const response = await axios.post(serverPath+path, data);
        if(response.status<100){
            console.log("info response")
        }else if(response.status<200){
            console.log("succesful post")
        }else if(response.status<300){
            console.log("redirect")
        }else if(response.status<400){
            console.log("client error")
        }else if(response.status<500){
            console.log("server error")
        }
        return response;
    } catch (error) {
        console.log(error);
    }
    return false;
}
export async function makeGetCall(path){
    try{
        const response = await axios.get(serverPath+path);
        return response.data;
    }catch(error){
        console.log(error)
    }
    return false
}
//TODO: write methods for get, delete, post, and put.
//Also, I dont know whether things are secure & encrypted but thats not worth looking into at this point.
//  We can look into that later on if we get the time.