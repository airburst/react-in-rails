import { QuestionIcon } from "@components/Icon";
import { Button, Flex, Modal } from "@simplybusiness/mobius";
import React, { ReactNode, useState } from "react";

type CardModalProps = {
  toggleText: string;
  title: ReactNode;
  body: ReactNode;
  onOpen?: () => void;
};

export const CardModal = ({
  toggleText,
  title,
  body,
  onOpen,
}: CardModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (onOpen) {
      onOpen();
    }

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Flex gap="var(--size-10)">
      <Button
        variant="ghost"
        className="card-modal__trigger"
        onClick={handleOpen}
      >
        <Flex>
          <span className="card-modal__explainer-title">{toggleText}</span>{" "}
          <QuestionIcon
            style={{ width: 16, height: 16 }}
            className="card-modal__info-icon"
          />
        </Flex>
      </Button>
      <Modal
        isOpen={open}
        onClose={handleClose}
        size="lg"
        className="card-modal__container"
        animation="fade"
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>{body}</Modal.Content>
      </Modal>
    </Flex>
  );
};
