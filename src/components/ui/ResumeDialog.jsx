import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function ResumeDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-4">
        <DialogHeader className="sr-only">
          <DialogTitle>Himanshu Kumar - Resume</DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full h-full overflow-hidden rounded-md pt-6">
          {open && (
            <iframe
              src="/assets/Himanshu_Kumar_Resume.pdf"
              title="Himanshu Kumar Resume"
              className="w-full h-full border-0 rounded-md"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
