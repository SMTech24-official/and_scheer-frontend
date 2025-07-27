"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import ProgressBar from "../ui/progressBar";
import PersonalInformation from "./personalInfo";
import CareerOverview from "./CareerOverview";
import SkillsExperience from "./SkillnExp";
import EducationalBackground from "./EducationalBackground";
import ContactInfo from "./ContactInfo";
import GenerateResume from "./GenerateResume";
import MyResume from "./MyResume";
import Education from "./EducationCertificate";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const MainComponents = () => {
  const [step, setStep] = useState(1);
  // const [formData,setNewForm ] = useState({})
  const [formData, setNewForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryRegion: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    recentJobTitle: "",
    jobExplanation: "",
    jobTitle: "",
    CompanyName: "",
    startDate: "",
    endDate: "",
    jobDescription: "",
    skills: [], // e.g. ["React", "TypeScript"]
    degree: "",
    institutionName: "",
    major: "",
    graduationStartDate: "",
    graduationEndDate: "",
    certificateTitle: "",
    issuingOrganization: "",
    certificateIssuedDate: "",
    certificateExpiryDate: null,
    linkedInProfileUrl: "",
    personalWebsiteUrl: "",
    otherSocialMedia: "",
    otherSocialMediaUrl: "",
  });

  const achievementRef = useRef<HTMLInputElement>(null);
  const certificateRef = useRef<HTMLInputElement>(null);
  const setFormData = (newData: any) => {
    setNewForm((prevFormData) => ({
      ...prevFormData,
      ...newData
    }));
  };

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData))
    }
  }, [formData])


  console.log(formData);
  //   const profileData = {
  //   firstName: formData.firstName,
  //   lastName: formData.lastName,
  //   phoneNumber: formData.phone,
  //   countryRegion: formData.country,
  //   address: formData.address,
  //   city: formData.city,
  //   state: formData.state,
  //   zipCode: formData.zip,
  //   // recentJobTitle: fromData.jobTitle,
  //   // jobExplanation: formData.jobDescription,
  //   jobTitle: formData.jobTitle,
  //   CompanyName: formData.companyName,
  //   startDate: "2022-01-15T00:00:00.000Z",
  //   endDate: "2024-06-30T00:00:00.000Z",
  //   jobDescription: formData.jobDescription,
  //   skills: [
  //     "JavaScript",
  //     "React",
  //     "TypeScript",
  //     "Next.js",
  //     "Tailwind CSS"
  //   ],
  //   degree: "BSc in Computer Science",
  //   institutionName: "North South University",
  //   major: "Software Engineering",
  //   graduationStartDate: "2017-01-01T00:00:00.000Z",
  //   graduationEndDate: "2021-01-01T00:00:00.000Z",
  //   certificateTitle: "Full Stack Web Development",
  //   issuingOrganization: "Coursera",
  //   certificateIssuedDate: "2021-08-01T00:00:00.000Z",
  //   certificateExpiryDate: null,
  //   linkedInProfileUrl: "https://www.linkedin.com/in/exampleuser",
  //   personalWebsiteUrl: "https://portfolio.example.com",
  //   otherSocialMedia: "GitHub",
  //   otherSocialMediaUrl: "https://github.com/exampleuser"
  // };
  const onSubmit = async () => {
    try {
      const sendForm = new FormData();

      // 🔄 Append dynamic profile data
      sendForm.append("data", JSON.stringify(formData));

      // 📄 Append achievement file if selected
      if (achievementRef.current?.files?.[0]) {
        sendForm.append("achievementFiles", achievementRef.current.files[0]);
      }

      // 📄 Append graduation certificate file if selected
      if (certificateRef.current?.files?.[0]) {
        sendForm.append("graduationCertificateFiles", certificateRef.current.files[0]);
      }

      // 🚀 Send request
      const res = await fetch("http://localhost:5005/api/v1/profiles/create", {
        method: "POST",
        body: sendForm,
        credentials: "include", // if using HttpOnly cookie
      });

      const result = await res.json();
      console.log("Profile created successfully!", result);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <div className=" px-2">
        <ProgressBar currentStep={step} totalSteps={7} />
        {step === 1 && <PersonalInformation setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 2 && <CareerOverview setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 3 && <SkillsExperience setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 4 && <Education setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 5 && <ContactInfo setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 6 && <GenerateResume setStep={setStep} onSubmit={onSubmit} />}
        {step === 7 && <MyResume />}
      </div>
    </Container>
  );
};

export default MainComponents;
