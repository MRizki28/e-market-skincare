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

    public function updateFile($file, $path, $nameFile, $oldFile){
        $filename = $nameFile . Str::random(5) . '.' . $file->getClientOriginalExtension();
        $file->move(public_path($path), $filename);
        $old_file = public_path($path) . $oldFile;
        if (file_exists($old_file)) {
            unlink($old_file);
        }
        return $filename;
    }
}