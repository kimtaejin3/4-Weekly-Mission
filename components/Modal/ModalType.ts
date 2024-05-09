import { Folder } from "@/types";
import { DeleteLinkModal } from "../DeleteLinkModal";

export type AddLinkModalType = {
  modalType: "AddLinkModal";
  data: {
    folderId: string;
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
    folderId: string;
    title: string;
    description: string;
  };
};

export type DeleteLinkModalType = {
  modalType: "DeleteLinkModal";
  data: {
    linkId: number;
    linkUrl: string;
  };
};

export type ModifyModalType = {
  modalType: "ModifyModal";
  data: {
    folderName: string;
    folderId: string;
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
  | ShareModalType
  | DeleteLinkModalType;

export type ActionType =
  | { type: "showModal"; payload: PayloadType }
  | { type: "hideModal" };

export type ModalType = {
  type: string;
  isOpen: boolean;
  data: any;
};
