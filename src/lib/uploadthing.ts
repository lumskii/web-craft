import { generateUploadButton, generateUploadDropzone } from '@uploadthing/react';
import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

// Generate the UploadButton and UploadDropzone components
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// Use the existing helper functions
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
