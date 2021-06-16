import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function PushNotification(props) {
    const token = useSelector((state) => state.user.token);
    const { tokens, title, bodyPush, type } = props;
    const push = async () => {
    tokens.forEach(async (row) => {
      try {
        const body = {
          tokens: row,
          title: title,
          body: bodyPush,
          type: type,
        };

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
          //const result = await res.json();
          console.log("ok");
          //history.push(`/admin/reportbill`);
        } else {
          console.log("SOMETHING WENT WRONG");
        }
      } catch (err) {
        console.log(err);
      }
    });
  };
  push();
}
