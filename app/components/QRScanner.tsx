import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useUser } from "../context/userContext";

export const BarcodeScanner = () => {
  const { user, login } = useUser();
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_HOST + "users";

  useEffect(() => {
    if (result) {
      console.log(result);

      fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
          const userExist = json.find((user: any) => user.sku === result);
          userExist ? login(userExist) : null;
        });
    }
  }, [result]);

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};
