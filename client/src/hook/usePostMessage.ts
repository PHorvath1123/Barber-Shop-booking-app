import { useState } from "react";
import type { formData } from "../components/Contact";

export const usePostMessage = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

  const sendMessage = async ({name, email, message}: formData) => {
    const object = {
      name,
      email,
      message,
      access_key: "2a31ac37-fd2d-440d-abf3-234d231629fd",
    };
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setIsSuccessful(true);
    }
    else{
      console.error('Failed to send message')
    }
  };

  return { isSuccessful, sendMessage, setIsSuccessful };
};
