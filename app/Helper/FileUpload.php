<?php

namespace App\Helper;
use Illuminate\Support\Str;

class FileUpload
{
    public function uploadFile($file, $path, $nameFile){
        $filename = $nameFile . Str::random(5) . '.' . $file->getClientOriginalExtension();
        $file->move(public_path($path), $filename);
        return $filename;
    }

    public function updateFile($file, $path, $nameFile, $oldFile)
    {
        $filename = $nameFile . Str::random(5) . '.' . $file->getClientOriginalExtension();
        $file->move(public_path($path), $filename);
        
        if ($oldFile) {
            $oldFilePath = public_path($path) . $oldFile;
            if (file_exists($oldFilePath) && !is_dir($oldFilePath)) {
                unlink($oldFilePath);
            }
        }

        return $filename;
    }
}