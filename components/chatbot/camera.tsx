'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { SingleImageDropzone } from '../SingleImageDropzone';
import { Button } from "../ui/button";
import { Camera } from "lucide-react";

type CameraUploaderProps = {
  onImageUpload: (url: string) => void;
};

export default function CameraUploader({ onImageUpload }: CameraUploaderProps) {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleUpload = async () => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
            if (progress === 100) {
              setTimeout(() => {
                setIsOpen(false);
              }, 500); // Close dialog 500ms after upload completes
            }
          },
        });

        const uploadedUrl = res?.url;
        if (uploadedUrl) {
          onImageUpload(uploadedUrl);
        }

      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFile(undefined);
      setProgress(0);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="shrink-0">
          <Camera className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <SingleImageDropzone
          width={200}
          height={200}
          value={file}
          onChange={setFile}
        />
        <DialogFooter className="flex flex-col items-center">
          <Button
            onClick={handleUpload}
            disabled={!file || progress > 0}
          >
            {progress > 0 ? `Uploading... ${progress}%` : 'Analyze'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}