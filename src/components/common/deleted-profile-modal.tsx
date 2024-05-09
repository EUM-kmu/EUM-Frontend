import { Modal } from "./modal";
import { ProfileModalType } from "./type";

export const DeletedProfileModal = ({ onClose }: ProfileModalType) => {
  return (
    <Modal onClose={() => onClose()}>
      <Modal.Title text="알 수 없음" />
    </Modal>
  );
};
