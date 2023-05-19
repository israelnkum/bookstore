<?php

namespace App\Helpers;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use ReflectionClass;

class SaveFile
{
    protected Model $model;
    protected $file;
    protected string $directory;
    protected array $allowed;

    public function __construct($model, $file, $directory, $allowed = [])
    {
        $this->model = $model;
        $this->file = $file;
        $this->directory = $directory;
        $this->allowed = $allowed;
    }

    /**
     * @throws Exception
     */
    public function save()
    {
        $extension = $this->file->getClientOriginalExtension();

        if (count($this->allowed) && !in_array(strtolower($extension), $this->allowed, true)) {
            throw new \RuntimeException('File type not allowed');
        }

        $image_name = uniqid('', true) . '.' . $extension;
        $this->file->storeAs($this->directory . '/', $image_name);

        $reflection = new ReflectionClass($this->model);
        return $this->model->photo()->updateOrCreate(
            [
                'photoable_id' => $this->model->id,
                'photoable_type' => $reflection->getShortName()
            ], [
            'file_name' => $image_name
        ]);
    }
}
