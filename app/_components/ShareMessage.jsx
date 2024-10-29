import React from "react";
import {
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";
import { Modal } from "antd";

export default function ShareMessage({ open, setOpen, messageToShare }) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      title="Share Messages To"
      centered
      footer={null}
    >
      <div className="flex gap-5 justify-center items-center">
        <FacebookShareButton url={messageToShare}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LineShareButton url={messageToShare}>
          <LineIcon size={32} round />
        </LineShareButton>
        <LinkedinShareButton url={messageToShare}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton url={messageToShare}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </Modal>
  );
}
