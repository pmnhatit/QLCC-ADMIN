import React,{useEffect, useState} from "react";
import {useSelector} from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
// import Button from "../../../component/CustomButtons/Button.js";
import Card from "../../../component/Card/Card.js";
import CardAvatar from "../../../component/Card/CardAvatar.js";
// import CardBody from "../../../component/Card/CardBody.js";
import CustomTabs from "../../../component/CustomTabs/CustomTabs.js";
import InfoUser from "./InfoUser.js"
import avatar from "../../../asset/img/faces/marc.jpg";
import {useParams} from 'react-router-dom';

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

export default function UserProfile() {
  const classes = useStyles();
  const token=useSelector(state=>state.user.token);
  const [data,setData]= useState("");
  const [apart,setApart]=useState();
  const [isLoading,setIsLoading]=useState(false);
  const {id}=useParams();


  useEffect(() => {
    const getRes = async () => {
      setIsLoading(true);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/user/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
        
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200|| res1.status===200) {
        
        const result = await res.json();
        const result1= await res1.json();
        console.log(result1);
        
        setData(result.data);
        setApart(result1.data);
        setIsLoading(false);
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, []);

  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
        <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Thông tin tài khoản",
                //tabIcon: BugReport,
                tabContent: (      
                    !isLoading ? <InfoUser data={data} apart={apart}/>: <div>Loading....</div>
                )
              },           
            ]}
          />
        </GridItem>
       
      </GridContainer>
    </div>
  );
}