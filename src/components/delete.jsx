"use client";

import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export  function DeleteData ({data}) {

  // const router = useRouter()

     const handleDelete =async()=>{

const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${data._id}`,{
    method: "DELETE"
});
const roomData=await res.json();

if (res.ok) {
      toast.success(`"${data.name}" deleted successfully!`); 
      redirect("/MyListing"); 
    } else {
      toast.error("Failed to delete room."); 
    }

}




  return (
    <AlertDialog>
       
      <Button variant="danger">Delete</Button>
      <AlertDialog.Backdrop
        className="bg-linear-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
        variant="blur"
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-150">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete your room permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{data.name}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              
              <Button onClick={()=>handleDelete(data._id)} slot="close" variant="danger">
                Delete Room
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}