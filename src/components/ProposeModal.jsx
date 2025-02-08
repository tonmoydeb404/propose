import React, { useState } from "react";
import {
  Alert,
  Button,
  Form,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const Message = (props) => <Tooltip {...props}>Copied</Tooltip>;

const ProposeModal = ({ className = "" }) => {
  const [show, setShow] = useState(false);
  const [proposeLink, setProposeLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const [text, setText] = useState("");
  const [reply, setReply] = useState("");

  // Utility: Validate URL
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setProposeLink(null);
      return;
    }

    // Create a slug-like ID
    const linkID = text.trim().replace(/\s+/g, "-").toLowerCase();
    let genLink = `${window.location.origin}/${linkID}`;

    // Append reply as a search param if it's a valid URL
    if (reply.trim() && isValidURL(reply.trim())) {
      genLink += `?reply=${encodeURIComponent(reply.trim())}`;
    }

    setProposeLink(genLink);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(proposeLink).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => setCopied(false)
    );
  };

  const onClose = () => {
    setShow(false);
    setProposeLink(null);
    setText("");
    setReply("");
  };

  return (
    <>
      <Button
        className="mt-4 px-4"
        variant="danger"
        onClick={() => setShow(true)}
      >
        Propose Now
      </Button>
      <Modal
        className={className}
        onHide={onClose}
        show={show}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton className="border-0" />
        <Modal.Body className="pt-0">
          {!proposeLink && (
            <form className={`${className}`} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="small">
                  Her / His Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="her/his name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="small">Reply URL</Form.Label>
                <Form.Control
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="WhatsApp/Messenger"
                  isInvalid={reply.trim() && !isValidURL(reply.trim())}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid URL.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="danger" type="submit">
                Propose Now
              </Button>
            </form>
          )}

          {proposeLink && (
            <Alert variant="danger">
              <p>
                Now just copy the link and share it with the person. Don&apos;t
                be shy, and best of luck!
              </p>

              <OverlayTrigger
                trigger="click"
                placement="left"
                delay={{ show: 100, hide: 400 }}
                overlay={Message}
                show={copied}
              >
                <Button
                  size="sm"
                  variant="danger"
                  className="mb-2 me-2"
                  onClick={handleCopy}
                >
                  Copy Link
                </Button>
              </OverlayTrigger>
              <Button
                size="sm"
                variant="outline-dark"
                className="mb-2"
                onClick={() => setProposeLink(null)}
              >
                Reset
              </Button>

              <p className="text-muted small mb-0">
                You can preview the link{" "}
                <a
                  href={proposeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-danger"
                >
                  here
                </a>{" "}
                before sharing.
              </p>
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProposeModal;
