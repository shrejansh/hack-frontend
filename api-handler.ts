import LocalVariables from "./config";
import useGlobal from "./app/store";

export async function get(endpoint: string){
    try{
        const response = await fetch(`${process.env.ENDPOINT_URL || LocalVariables.ENDPOINT}/${endpoint}`, {
            method: "GET",
            // mode: "cors",
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": process.env.ENDPOINT_URL || LocalVariables.ENDPOINT,
              "Authorization": `Bearer ${useGlobal.getState().token}`
            },
            
            // body: JSON.stringify({employee_id: empId}),
          });
        const resp = await response.json();
        if(response.ok){
          return {
            success: true,
            data: resp.data,
            message: resp.message
          };
        }
        return {
          success: false,
          data: resp.data,
          message: resp.message
        };
    }catch(e: any){
        console.log('Error occurred while calling get API', e.message);
    }
};

export async function post(endpoint: string, body: any){
  try{
      const response = await fetch(`${process.env.ENDPOINT_URL || LocalVariables.ENDPOINT}/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": process.env.ENDPOINT_URL || LocalVariables.ENDPOINT,
            "Authorization": `Bearer ${useGlobal.getState().token}`
          },
          body: JSON.stringify(body),
        });
      const resp = await response.json();
      if(response.ok){
        return {
          success: true,
          data: resp.data,
          message: resp.message
        };
      }
      return {
        success: false,
        data: resp.data,
        message: resp.message
      };
  }catch(e: any){
      console.log('Error occurred while calling post API', e.message);
  }
};