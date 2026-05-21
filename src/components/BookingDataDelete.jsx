"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BookingDataDelete({ bookingId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (closeModal) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:2001/booking/${bookingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // মোডাল বন্ধ করার জন্য HeroUI এর ক্লোজ ফাংশন কল করা ভালো
        if (typeof closeModal === 'function') closeModal(); 
        
        // ডিলিট হওয়ার পর পেজের ডাটা রিফ্রেশ করবে
        router.refresh(); 
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {/* ১. প্রধান ফিক্স: বাটনটিকে Trigger হিসেবে রেজিস্টার করতে হবে */}
      <AlertDialog.Trigger>
        <Button variant="danger">Delete</Button>
      </AlertDialog.Trigger>
      
      <AlertDialog.Backdrop 
        className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
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
                This will permanently delete this booking and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary" disabled={isDeleting}>
                Cancel
              </Button>
              
              {/* ২. দ্বিতীয় ফিক্স: HeroUI এর রুলস অনুযায়ী অ্যাকশন বাটন হ্যান্ডেল করা */}
              <Button 
                onClick={() => handleDelete()} 
                slot="close" 
                variant="danger"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Booking"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}