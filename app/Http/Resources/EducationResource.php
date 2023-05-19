<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class EducationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request): array|JsonSerializable|Arrayable
    {
        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'employee-dashboard' => new EmployeeResource($this->employee),
            'education_level_id' => $this->education_level_id,
            'education_level' => $this->educationLevel,
            'institution' => $this->institution,
            'qualification' => $this->qualification,
            'date' => $this->date,
        ];
    }
}
