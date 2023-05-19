<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MyTeamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     *
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'supervisor_id' => $this->supervisor_id,
            'employee' => [
                'id' => $this->employee->id,
                'name' => $this->employee->name
            ]
        ];
    }
}
