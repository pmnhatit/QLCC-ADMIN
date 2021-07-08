import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
// import Dashboard from "@material-ui/icons/Dashboard";
// import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "../CustomInput/CustomInput.js";
import Button from "../CustomButtons/Button.js";
import { firebase } from "../../../src/firebase.js";
import { useSelector } from "react-redux";
import styles from "../../asset/jss/material-dashboard-react/components/headerLinksStyle.js";
import { addUser } from "../../redux/action/userAction.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const [noti, setNoti] = React.useState({
    bill: 1,
    repair1: 1,
    repair2: 1,
    repair3: 1,
    parking:1,
    service: 1,
    post: 1,
    all: 0,
  });
  const [reload,setReload]=React.useState(true)
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const handleLogout = () => {
    let action = addUser({}, null);
    dispatch(action);
    // action= deleteApart(0);
    // dispatch(action);
    history.push("/");
  };
  const handleProfile = () => {
    history.push("/admin/profile");
  };
  const messaging = firebase.messaging();
  messaging.onMessage(async (payload) => {
    console.log("Message received in noti ", payload);
    setReload(!reload)
  });
  useEffect(() => {
    const getRes = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/all-bill/count-bills?report=true`,
          {
            // get block
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const res1 = await fetch(
          process.env.REACT_APP_API_LINK + `/api/repair/count-notices?type=0&status=0&is_read_admin=false`,
          {
            // get block
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const res2 = await fetch(
          process.env.REACT_APP_API_LINK + `/api/repair/count-notices?type=2&status=0`,
          {
            // get block
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const res3 = await fetch(
          process.env.REACT_APP_API_LINK + `/api/repair/count-notices?type=1&status=0`,
          {
            // get block
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const res4 = await fetch(
          process.env.REACT_APP_API_LINK + `/api/noti-parking/unconfirm`,
          {
            // get block
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        ); const res5 = await fetch(
          process.env.REACT_APP_API_LINK + `/api/register-service/count-register?status=0`,
          {
            // get block
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const res6 = await fetch(
          process.env.REACT_APP_API_LINK + `/api/post/count-post?status=0`,
          {
            // get block
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
       
        if (res.status === 200  && res1.status === 200 &&res2.status === 200  &&res3.status === 200  &&res4.status === 200  &&res5.status === 200  &&res5.status === 200  ) {
          console.log("Vo 200OK");
          const result = await res.json();
          const result1 = await res1.json();
          const result2 = await res2.json();
          const result3 = await res3.json();
          const result4 = await res4.json();
          const result5 = await res5.json();
          const result6 = await res6.json();
          console.log(result4);
          setNoti({
            bill: result.count,repair1: result1.count,repair2: result2.count,repair3: result3.count,parking:result4.unconfirm,
            service: result5.count,post: result6.count,
            all:result.count+ result1.count+result2.count+ result3.count+result4.unconfirm+ result5.count+result6.count})
        } else {
          console.log("k data");
          
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRes();
  }, [reload]);
  return (
    <div>
      <div className={classes.searchWrapper}>
        {/* <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        /> */}
        {/* <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button> */}
      </div>
      {/* <Button
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button> */}
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />

          {noti.all!==0&&<span className={classes.notifications}>{noti.all}</span>}
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={e=>{handleCloseNotification(); history.push('/admin/reportbill')}}
                      className={classes.dropdownItem}>
                      Khiếu nại hóa đơn
                      {noti.bill !== 0 && (<span className={classes.num_notifications}>{noti.bill}</span>)}
                    </MenuItem>
                    <MenuItem
                      onClick={e=>{handleCloseNotification(); history.push('/admin/repair')}}
                      className={classes.dropdownItem}>
                      Yêu cầu sửa chữa khu vực chung
                      {noti.repair1 !== 0 && (<span className={classes.num_notifications}>{noti.repair1}</span>)}
                    </MenuItem>
                    <MenuItem
                      onClick={e=>{handleCloseNotification(); history.push('/admin/repair/repair')}}
                      className={classes.dropdownItem}>
                        Yêu cầu dịch vụ sửa chữa
                      {noti.repair2 !== 0 && (<span className={classes.num_notifications}>{noti.repair2}</span>)}
                    </MenuItem><MenuItem
                      onClick={e=>{handleCloseNotification(); history.push('/admin/repair/self_repair')}}
                      className={classes.dropdownItem}>
                        Yêu cầu tự sửa chữa
                      {noti.repair3 !== 0 && (<span className={classes.num_notifications}>{noti.repair3}</span>)}
                    </MenuItem>
                    <MenuItem
                      onClick={e=>{handleCloseNotification(); history.push('/admin/noti_parking')}}
                      className={classes.dropdownItem}>
                        Khiếu nại bãi xe
                      {noti.parking !== 0 && (<span className={classes.num_notifications}>{noti.parking}</span>)}
                    </MenuItem>
                    <MenuItem
                      onClick={e=>{handleCloseNotification(); history.push('/admin/service_register')}}
                      className={classes.dropdownItem}>
                        Đăng kí sử dụng khu vực chung
                      {noti.service !== 0 && (<span className={classes.num_notifications}>{noti.service}</span>)}
                    </MenuItem>
                    <MenuItem
                      onClick={e=>{handleCloseNotification(); history.push('/admin/browse_post')}}
                      className={classes.dropdownItem}>
                        Yêu cầu đăng bài
                      {noti.post !== 0 && (<span className={classes.num_notifications}>{noti.post}</span>)}
                    </MenuItem>                                     
                      <div style ={{width:"280px"}}></div>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleProfile}
                      className={classes.dropdownItem}
                      // href="/admin/profile"
                    >
                      Thông tin cá nhân
                    </MenuItem>
                   
                    <Divider light />
                    <MenuItem
                      onClick={handleLogout}
                      className={classes.dropdownItem}
                    >
                      Đăng xuất
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
