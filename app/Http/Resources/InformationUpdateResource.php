<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class InformationUpdateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'information' => $this->information_type,
            'information_type' => $this->information_type,
            'old_info' => $this->old_info,
            'new_info' => $this->new_info,
            'status' => $this->status,
            'status_changed_date' => $this->status_changed_date,
            'status_changed_by' => $this->status_changed_by,
            'requested_by' => $this->requestedBy->employee->name,
            'date_requested' => Carbon::parse($this->created_at)->diffForHumans(),
            'created_at' => Carbon::parse($this->created_at)->format('M d y'),
        ];
    }
}