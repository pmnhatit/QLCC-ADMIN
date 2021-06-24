/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
//import Dashboard from "@material-ui/icons/Dashboard";
import HomeIcon from '@material-ui/icons/Home';
import Person from "@material-ui/icons/Person";
import ApartmentIcon from '@material-ui/icons/Apartment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import BuildIcon from '@material-ui/icons/Build';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import DescriptionIcon from '@material-ui/icons/Description';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import AddCommentIcon from '@material-ui/icons/AddComment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// core components/views for Admin layout
//import Homepage from "./view/Homepage/homepage";
import UserProfile from "./view/Profile/profile";
import UserAccount from "./view/UserAccount/UserAccount";
import AdminAccount from "./view/AdminAccount/AdminAccount";
import DetailUser from "./view/UserAccount/DetailUser/DetailUser";
import ImportBill from "./view/Bill/ImportBill/ImportBill.js"
import Bill from "./view/Bill/Bill.js";
import ReportBill from "./view/Bill/ReportBill/ReportBill.js";
import DetailReport from "./view/Bill/ReportBill/DetailReport";
import DetailAllBill from "./view/Bill/AllBill/DetailAllBill";
import Apart from "./view/Apart/Apart";
import DetailApart from "./view/Apart/DetailApart/DetailApart.js"

import Block from "./view/Block/Block";
import EditBlock from "./view/Block/DetailBlock/EditBlock";
import PublicArea from "./view/Repair/PublicArea/PublicArea";
import RequestRepair from "./view/Repair/RequestRepair/RequestRepair.js"
import RequestSelfRepair from "./view/Repair/RequestSelfRepair/RequestSelfRepair.js"
import DetailPublicArea from "./view/Repair/PublicArea/DetailPublicArea";
import DetailRequestRepair from "./view/Repair/RequestRepair/DetailRequestRepair";
import DetailRequestSelfRepair from "./view/Repair/RequestSelfRepair/DetailRequestSelfRepair";
import Parking from "./view/Parking/Parking.js";
import DetailParking from "./view/Parking/DetailParking/DetailParking.js";

import SendNotification from "./view/SendNotifications/SendNotification.js"
import ServicePlace from "./view/ServicePlace/ServicePlace.js";
import ServiceRegister from "./view/ServiceRegister/ServiceRegister.js"
import BrowsePost from "./view/BrowsePost/BrowsePost.js"
import DetailBrowsePost from "./view/BrowsePost/DetailBrowsePost/DetailBrowsePost.js"
//import NotificationsPage from "views/Notifications/Notifications.js";
// core components/views for RTL layout


const dashboardRoutes = [
  {
    path: "/apart/detail/:apart_id",
    name: "Quản lý căn hộ",
    rtlName: "لوحة القيادة",
    icon: HomeIcon,
    component: DetailApart,
    layout: "/admin",
    private: true
  },
  {
    path: "/apart",
    name: "Quản lý căn hộ",
    rtlName: "لوحة القيادة",
    icon: HomeIcon,
    component: Apart,
    layout: "/admin"
  },
 {
    path: "/block/detail/:id",
    name: "Quản lý toà nhà",
    rtlName: "لوحة القيادة",
    icon: ApartmentIcon,
    component: EditBlock,
    layout: "/admin",
    private: true
  },
  {
    path: "/block",
    name: "Quản lý toà nhà",
    rtlName: "لوحة القيادة",
    icon: ApartmentIcon,
    component: Block,
    layout: "/admin"
  },
  {
    path: "/notification/detail/:id",
    name: "Thông báo chung",
    rtlName: "لوحة القيادة",
    icon: AddAlertIcon,
    component: SendNotification,
    layout: "/admin",
    private:true
  },
  {
    path: "/notification",
    name: "Thông báo chung",
    rtlName: "لوحة القيادة",
    icon: AddAlertIcon,
    component: SendNotification,
    layout: "/admin"
  },
 
  {
    path: "/bill/importbill",
    name: "Nhập hóa đơn",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ReceiptIcon,
    component:ImportBill ,
    layout: "/admin",
    private: true
  },
  {
    path: "/bill/detail/all/:bill_id",
    name: "Nhập hóa đơn",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ReceiptIcon,
    component:DetailAllBill ,
    layout: "/admin",
    private: true
  },
  {
    path: "/bill",
    name: "Quản lý hóa đơn",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ReceiptIcon,
    component:Bill ,
    layout: "/admin"
  },
  {
    path: "/reportbill/:id",
    name: "Khiếu nại hóa đơn",
    rtlName: "ملف تعريفي للمستخدم",
    icon: ReceiptIcon,
    component:DetailReport ,
    layout: "/admin",
    private: true
  },
  {
    path: "/reportbill",
    name: "Khiếu nại hóa đơn",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DescriptionIcon,
    component:ReportBill ,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Thông tin tài khoản",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component:UserProfile,
    layout: "/admin",
    private: true
  },
  {
    path: "/user_account/:id",
    name: "Chi tiet người dùng",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: DetailUser ,
    layout: "/admin",
    private: true
  },
  {
    path: "/user_account",
    name: "Quản lý người dùng",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component:UserAccount ,
    layout: "/admin"
  },

  {
    path: "/admin_account",
    name: "Quản lý admin",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SupervisorAccountIcon,
    component:AdminAccount ,
    layout: "/admin"
  },
  {
    path: "/repair/repair/detail/:notice_id",
    name: "Sửa chữa dịch vụ",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BuildIcon,
    component:DetailRequestRepair,
    layout: "/admin",
    private: true
  },
  {
    path: "/repair/repair",
    name: "Sửa chữa dịch vụ",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BuildIcon,
    component:RequestRepair,
    layout: "/admin",
    private: true
  },
  {
    path: "/repair/self_repair/detail/:notice_id",
    name: "Tự sửa chữa",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BuildIcon,
    component:DetailRequestSelfRepair,
    layout: "/admin",
    private: true
  },
  {
    path: "/repair/self_repair",
    name: "Tự sửa chữa",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BuildIcon,
    component:RequestSelfRepair,
    layout: "/admin",
    private: true
  },
  {
    path: "/repair/detail/:notice_id",
    name: "Sửa chữa",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BuildIcon,
    component:DetailPublicArea,
    layout: "/admin",
    private: true
  },
  {
    path: "/repair",
    name: "Sửa chữa",
    rtlName: "ملف تعريفي للمستخدم",
    icon: BuildIcon,
    component:PublicArea,
    layout: "/admin"
  },
  {
    path: "/noti_parking/:notice_id",
    name: "Khiếu nại bãi xe",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DriveEtaIcon,
    component:DetailParking,
    layout: "/admin",
    private: true
  },
  {
    path: "/noti_parking",
    name: "Khiếu nại bãi xe",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DriveEtaIcon,
    component:Parking,
    layout: "/admin"
  },
  {
    path: "/service_place/detail/:id",
    name: "Quản lý khu vực dịch vụ ",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DriveEtaIcon,
    component:ServicePlace,
    layout: "/admin",
    private: true
  },
  {
    path: "/service_place",
    name: "Quản lý khu vực dịch vụ ",
    rtlName: "ملف تعريفي للمستخدم",
    icon: HomeWorkIcon,
    component:ServicePlace,
    layout: "/admin"
  },
  {
    path: "/service_register",
    name: "Yêu cầu dùng dịch vụ",
    rtlName: "ملف تعريفي للمستخدم",
    icon: MarkunreadMailboxIcon,
    component:ServiceRegister,
    layout: "/admin"
  },
  {
    path: "/browse_post/detail/:id",
    name: "Yêu cầu đăng bài",
    rtlName: "ملف تعريفي للمستخدم",
    icon: DriveEtaIcon,
    component:DetailBrowsePost,
    layout: "/admin",
    private: true
  },
  {
    path: "/browse_post",
    name: "Yêu cầu đăng bài",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AddCommentIcon,
    component:BrowsePost,
    layout: "/admin"
  },
  // {
  //   path: "/test",
  //   name: "Test",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: DriveEtaIcon,
  //   component:Test,
  //   layout: "/admin"
  // },

  
  // {
  //   path: "/notifications",
  //   name: "Gửi thông báo",
  //   rtlName: "إخطارات",
  //   //icon: Notifications,
  //   //component: NotificationsPage,
  //   layout: "/admin"
  // },
  
];

export default dashboardRoutes;
