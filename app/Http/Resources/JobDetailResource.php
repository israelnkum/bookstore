<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class JobDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'position_id' => $this->position_id,
            'job_title' => $this->position?->name,
            'status' => $this->status,
            'location' => $this->location,
            'joined_date' => $this->joined_date,
            'contract_start_date' => $this->contract_start_date,
            'contract_end_date' => $this->contract_end_date,
            'employee_id' => $this->employee_id,
            'user_id' => $this->user_id,
            'job_category_id' => $this->job_category_id,
            'job_category' => $this->jobCategory->name,
            'sub_unit_id' => $this->sub_unit_id,
            'sub_unit' => $this->subUnit->name,
            'contract_detail' => $this->photo ? $this->photo->file_name : null,
        ];
    }
}
