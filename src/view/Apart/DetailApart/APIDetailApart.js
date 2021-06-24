
import React from "react";
import { useSelector } from "react-redux";
export default function APIDetailApart(){
    const token = useSelector((state) => state.user.token);
    const getUrl = async (key) => {
        let temp = [];
        console.log("in");
        if (key.length >= 1) {
          try {
            for (let i = 0; i < key.length; i++) {
              if(key[i]!=="")
              {const res = await fetch(
                process.env.REACT_APP_API_LINK +
                  `/api/uploadv2/image-url?key=${key[i]}`,
                {
                  // get apart
                  method: "GET",
                  headers: {
                    Authorization: "Bearer " + `${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              if (res.status === 200) {
                const result = await res.json();
                console.log("get url ok");
                temp[i] = { value: result.imageUrl };
              } else {
                const result = await res.json();
                alert(result.message);
              }}
            }
            console.log(temp);
            return temp;
          } catch (err) {
            console.log(err);
          }
        } else return temp;
      };
    
      const getUser = async (data) => {
        try {
            const res = await fetch(
              process.env.REACT_APP_API_LINK + `/api/user/${data.owner.id}`,
              {
                // get apart
                method: "GET",
                headers: {
                  Authorization: "Bearer " + `${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

    
            if (res.status === 200 ) {
              const result = await res.json();
              return result.data
            } else {
              const result = await res.json();
              alert(result.message);
            }
        } catch (err) {
          console.log(err);
        }
      };
      const getBlock = async (data) => {
        try {
          const res = await fetch(
            process.env.REACT_APP_API_LINK + `/api/block/all`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + `${token}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          if (res.status === 200) {
            const result = await res.json();
            console.log("block ok");
            return result.data;
          } else {
            const result = await res.json();
            alert(result.message);
          }
        } catch (err) {
          console.log(err);
        }
      };
    
return(
   { getUrl,
    getUser,
    getBlock}
)
}