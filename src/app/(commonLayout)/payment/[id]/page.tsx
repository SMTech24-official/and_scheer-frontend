"use client";

import PassPayment from "@/components/payment/stripePayment/Checkout";
// import CheckoutPage from "@/components/payment/stripePayment/Checkout";

import UserBillingInfo from "@/components/payment/UserBillingInfo";
import Container from "@/components/ui/Container";
import React, { useState } from "react";

export interface UserBillingType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  additionalInfo: string;
}

export interface PaymentInfoType {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  nameOnCard: string;
  country: string;
  postalCode: string;
}

export default function Billing() {
  const [userBillingInfo, setUserBillingInfo] = useState<UserBillingType>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    additionalInfo: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    country: "",
    postalCode: "",
  });

  console.log(paymentInfo);

  const handlePayment = (paymentInfo: PaymentInfoType) => {
    setPaymentInfo(paymentInfo);
    console.log(userBillingInfo, paymentInfo, "Hr is user info");
  };

  return (
    <div className="md:mx-3">
      <Container>
        <h1 className="text-3xl md:text-5xl font-semibold mb-12">
          Billing Information
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <UserBillingInfo
            userBillingInfo={userBillingInfo}
            setUserBillingInfo={setUserBillingInfo}
          />

          <PassPayment />
        </div>
      </Container>
    </div>
  );
}
