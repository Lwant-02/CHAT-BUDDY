import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

export default function Contact() {
  return (
    <>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfH-904YUwpNtS8nmh7vIKOsyBrTMjpdmm9ngZCB2Ci8IbeOw/viewform?usp=sf_link"
        className="mb-2 bg-grey-50 p-2 rounded-md items-center flex justify-center hover:bg-grey-100 shadow-md transition-all duration-300"
      >
        <span className="text-sm uppercase">Feedbacks</span>
      </a>
      <span className="flex justify-between items-center">
        <span className="capitalize text-grey-600 text-sm">
          Developer Contact:
        </span>
        <span className="flex gap-5">
          <a
            href="https://www.facebook.com/nawmong02?mibextid=LQQJ4d"
            target="_blank"
          >
            <FacebookIcon className="hover:text-grey-400 transition-all duration-300 " />
          </a>
          <a href="https://github.com/Lwant-02" target="_blank">
            <GitHubIcon className="hover:text-grey-400 transition-all duration-300 " />
          </a>
          <a
            href="mailto:jaimain671@gmail.com?subject=Feedback"
            target="_blank"
          >
            <EmailIcon className="hover:text-grey-400 transition-all duration-300" />
          </a>
        </span>
      </span>
    </>
  );
}
