<?php

namespace App\Services;

use App\Upload;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadService
{
    public function upload_file($file, $document_type, $provider)
    {
        $result = null;
        $user = Auth::user();
        $unique_name = Str::uuid();
        $filename = $file->getClientOriginalName();
        $extension = $file->extension();
        $directory = date("Y") . '/' . date("m") . '/' . $provider;

        if (env('APP_ENV') !== 'production') {
            $directory = 'test/' . $directory;
        }

        $upload = Upload::create([
            'user_id' => $user->id,
            'filename' => $filename,
            'type' => $file->getMimeType(),
            'document_type' => $document_type,
            'size' => $file->getSize(),
            'path' => env('DO_SPACES_SUBDOMAIN')
            . '/' . $directory
            . '/' . $unique_name
            . '.' . $extension,
        ]);

        Storage::disk('spaces')->putFileAs(
            $directory,
            $file,
            $unique_name . '.' . $extension,
            [
                'visibility' => 'public',
                'Metadata' => [
                    'provider' => $provider,
                    'user' => $user->full_name,
                ],
            ]
        );

        if ($upload !== null) {
            $result = $upload;
        }

        return $result;
    }
}
