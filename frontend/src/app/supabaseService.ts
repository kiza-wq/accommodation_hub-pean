import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = import.meta.env['NG_APP_SUPABASE_URL'];
    const supabaseKey = import.meta.env['NG_APP_SUPABASE_PUBLISHABLE_KEY'];

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Uploads an image file to a designated Supabase bucket
   * @param bucket Name of the storage bucket
   * @param filePath Destination path inside the bucket (e.g., 'avatars/user123.jpg')
   * @param file The File object retrieved from the HTML input element
   */
  async uploadImage(bucket: string, filePath: string, file: File) {
    return Object.assign(
      await this.supabase.storage.from(bucket).upload(filePath, file, {
        cacheControl: '3600',
        upsert: true, // Set to true if you want to overwrite existing files
      }),
    );
  }

  /**
   * Generates a public shareable URL for a file inside a public bucket
   */
  getPublicUrl(bucket: string, filePath: string): string {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  }
}
