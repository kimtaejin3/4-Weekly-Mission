import { Folder } from "@/types";

export type AddLinkModalType = {
  modalType: "AddLinkModal";
  data: {
    folders: Folder[];
    linkUrl: string;
  };
};

export type AddModalType = {
  modalType: "AddModal";
  data: null;
};

export type DeleteModalType = {
  modalType: "DeleteModal";
  data: {
    title: string;
    description: string;
  };
};

export type ModifyModalType = {
  modalType: "ModifyModal";
  data: {
    folderName: string;
  };
};

export type ShareModalType = {
  modalType: "ShareModal";
  data: {
    folderName: string;
  };
};

export type PayloadType =
  | AddLinkModalType
  | AddModalType
  | DeleteModalType
  | ModifyModalType
  | ShareModalType;

export type ActionType =
  | { type: "showModal"; payload: PayloadType }
  | { type: "hideModal" };

export type ModalType = {
  type: string;
  isOpen: boolean;
  data: any;
};
