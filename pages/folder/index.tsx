import { Footer } from "@/components";
import { FolderHeader } from "@/components";
import { FolderMain } from "@/components/FolderMain";
import { Modal } from "@/components/Modal";
import { ModalContextProvider } from "@/context/modalContext";

export default function Folder() {
  return (
    <ModalContextProvider>
      <FolderHeader />
      <FolderMain />
      <Footer />
      <Modal />
    </ModalContextProvider>
  );
}
