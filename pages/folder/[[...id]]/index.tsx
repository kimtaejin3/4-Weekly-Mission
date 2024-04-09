import { Footer } from "@/components";
import { FolderHeader } from "@/components";
import { FolderMain } from "@/components/FolderMain";
import { Modal } from "@/components/Modal";
import { ModalContextProvider } from "@/context/modalContext";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";

export default function Folder() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/signin");
    }
  }, []);

  return (
    <ModalContextProvider>
      <FolderHeader />
      <FolderMain />
      <Footer />
      <Modal />
    </ModalContextProvider>
  );
}
