import { useState } from "react";
import type { formData } from "../components/Contact";

export const usePostMessage = () => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const sendMessage = async ({name, email, message}: formData) => {
    const object = {
      name,
      email,
      message,
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      subject: 'New message from Prestige Cuts website'
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
      setIsError(true);
      console.error('Could not send the message.')
    }
  };

  return { isSuccessful, sendMessage, setIsSuccessful, isError };
};
