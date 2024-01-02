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
  useEffect(() => {
    if (result) {
      console.log(result);

      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then((response) => response.json())
        .then((json) => {
          login(json);
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
