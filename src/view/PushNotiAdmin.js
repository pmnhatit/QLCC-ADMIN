
import {messaging} from "../firebase";
import { useSelector } from "react-redux";

export default function PushNotiAdmin() {
    const token = useSelector((state) => state.user.token);
  const PushNotificationAdmin = async () => {
    try {
      let body;
      await messaging.requestPermission().then(() => {
          return messaging.getToken();
        })
        .then((token_device) => {
          console.log(token_device);
        body = {
        tokens: [token_device],
        title: "Khiếu nại đã được xử lý",
        content:
          "BQL chung cư thông báo, khiếu nại của anh/chị đã được giải quyết. Đề nghị kiểm tra lại.",
        type: 1,
      };
        });

      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/push-noti/add-notice`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (res.status === 200) {   
        console.log("tu push noti ok");
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {PushNotificationAdmin}
}
