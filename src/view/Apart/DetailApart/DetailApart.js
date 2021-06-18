import React,{useState,useEffect} from "react";
import {useSelector} from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import { useDispatch } from "react-redux";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
//import Button from "../../../component/CustomButtons/Button.js";
import Card from "../../../component/Card/Card.js";
import { useParams } from "react-router-dom";
import SlideShow from "../../../component/SlideShow/SlideShow.js"
import CustomTabs from "../../../component/CustomTabs/CustomTabs.js";
import { handleData } from "./ServiceDetailApart.js";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


const useStyles = makeStyles(styles);

export default function Apart() {
  const classes = useStyles();
  const token=useSelector(state=>state.user.token);
  const { apart_id } = useParams();
  const [image, setImage] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [data,setData]=useState([]);

  const getUrl = async (key) => {
    let temp=[];
    console.log("in");
    if (key.length >= 1) {
      try {
        for (let i=0;i<key.length;i++)
       { const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/uploadv2/image-url?key=${key[i]}`,
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
          temp[i]={value:result.imageUrl};
        } else {
          const result = await res.json();
          alert(result.message);
        }}
        console.log(temp);
        return temp;
      } catch (err) {
        console.log(err);
      }
    }
    else 
      return temp;
    setIsLoad(false);
  };
  const getUser = async (data) => {
    try{
      if(data.owner.is_active===true)
      {
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

    if (res.status === 200) {
      const result = await res.json();

      console.log("user ok");
      setData(handleData(data, result.data));
      //setData(result.data);
      setIsLoad(false);
    } else {
      const result = await res.json();
      alert(result.message);
    }}
    else
      {}
  }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getRes = async () => {
      setIsLoad(true);
      try
      {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/${apart_id}`,
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
        console.log("Vo 200OK");
        console.log(result.data);
        await getUser(result.data)
        if (result.data.images!==[])
          setImage(await getUrl(result.data.images));
        else
          console.log("no image");
        setIsLoad(false);
      } else {
        const result = await res.json();
        alert(result.message);
      }}
      catch (err) {
        console.log(err);
      }
    };
    getRes();
  }, []);
  return (
    <div>
      { !isLoad && <GridContainer>
      <GridItem xs={12} sm={12} md={5}>
            <Card profile>
            <SlideShow images={image}></SlideShow>:
            </Card>
          </GridItem>
        <GridItem xs={12} sm={12} md={7}>
        <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Chi tiết",
                //tabIcon: BugReport,
                tabContent: (      
                    <div></div>
                )
              },
              {
                tabName: "Chỉnh sửa",
                //tabIcon: BugReport,
                tabContent: (      
                    <div></div>
                )
              },

            ]}
          />
        </GridItem>
       
      </GridContainer>}
    </div>
  );
}