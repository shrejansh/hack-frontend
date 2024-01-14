import LocalVariables from "./config";
import useGlobal from "./app/store";

export async function get(endpoint: string){
    try{
        const response = await fetch(`${process.env.URL || LocalVariables.ENDPOINT}/${endpoint}`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": process.env.URL || LocalVariables.ENDPOINT,
              "Authorization": `Bearer ${useGlobal.getState().token}`
            },
            
            // body: JSON.stringify({employee_id: empId}),
          });
        const resp = await response.json();
        console.log(resp, 'GOT THIS')
        return {
          data: resp.data,
          message: resp.message,
        };
    }catch(e: any){
        console.log('Error occurred while calling get API', e.message);
    }
};

export async function post(endpoint: string, body: any){
  try{
      const response = await fetch(`${process.env.URL || LocalVariables.ENDPOINT}/${endpoint}`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": process.env.URL || LocalVariables.ENDPOINT
            // 'Access-Control-Allow-Origin': true,
          },
          body: JSON.stringify(body),
        });
      const resp = await response.json();
      console.log(resp, 'GOT THIS')
      return {
        data: resp.data,
        message: resp.message
      };
  }catch(e: any){
      console.log('Error occurred while calling get API', e.message);
  }
};