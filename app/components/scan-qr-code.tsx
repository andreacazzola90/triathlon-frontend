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
  return (
    <main className="flex flex-col items-center">
      <h1 className="text font-bold ">Scansiona il qr-code dell'utente</h1>
      <BarcodeScanner />
    </main>
  );
}
