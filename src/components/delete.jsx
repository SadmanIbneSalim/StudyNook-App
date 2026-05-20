"use client";

import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";

export  function DeleteData ({data}) {

     const handleDelete =async()=>{

const res= await fetch(`http://localhost:2001/rooms/${data._id}`,{
    method: "DELETE"
});
const roomData=await res.json();

redirect('/rooms')
console.log(roomData);


}




  return (
    <AlertDialog>
       
      <Button variant="danger">Delete</Button>
      <AlertDialog.Backdrop  className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
        variant="blur">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-200">
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