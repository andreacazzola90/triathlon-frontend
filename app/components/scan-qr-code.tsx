import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useUser } from "../context/userContext";
import { BarcodeScanner } from "./QRScanner";

type IFormInput = {
  qrcode?: any;
};
const schema = yup.object().shape({
  qrcode: yup.mixed().required("Please upload an image"),
});

export default function ScanQrCode() {
  const { user } = useUser();
  const [result, setResult] = useState<string | null>(null);

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-3xl font-bold ">Scansiona il qr-code dell'utente</h1>

      <BarcodeScanner />
    </main>
  );
}
