import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { SupabaseService } from '../../supabaseService';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCamera } from '@ng-icons/heroicons/outline';
import { bootstrapCloudUpload } from '@ng-icons/bootstrap-icons';
@Component({
  selector: 'app-image-upload',
  imports: [CommonModule, NgIcon],
  templateUrl: './image-upload.component.html',
  viewProviders: [provideIcons({ heroCamera, bootstrapCloudUpload })],
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  selectedFile: File | null = null;
  uploadedImageUrl = input<string | null>(null);
  imageChange = output<string>();
  isUploading = false;
  isUploaded = signal(false);
  errorMessage = '';

  constructor(private supabaseService: SupabaseService) {}

  // Handle native file selection changes
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = '';
    }
  }

  // Trigger the upload process
  async onUpload(): Promise<void> {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an image file first.';
      return;
    }

    this.isUploading = true;
    this.errorMessage = '';

    // Create a unique file path structure to prevent namespace collisions
    const bucketName = 'accommodation_images';
    const fileExtension = this.selectedFile.name.split('.').pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const filePath = `uploads/${uniqueFileName}`;

    try {
      const { data, error } = await this.supabaseService.uploadImage(
        bucketName,
        filePath,
        this.selectedFile,
      );

      if (error) {
        throw error;
      }

      // If successful, retrieve and present the public image link
      this.imageChange.emit(this.supabaseService.getPublicUrl(bucketName, filePath));
      this.selectedFile = null; // Reset selection input tracking
    } catch (err: any) {
      this.errorMessage = err.message || 'An error occurred during file upload.';
    } finally {
      this.isUploading = false;
      this.isUploaded.set(true);
    }
  }
}
