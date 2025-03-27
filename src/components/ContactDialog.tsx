
import React from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose 
} from '@/components/ui/dialog';
import ContactForm from './ContactForm';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const handleSuccess = () => {
    // Close dialog after successful submission
    setTimeout(() => {
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">Get in Touch</DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form below and we'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
