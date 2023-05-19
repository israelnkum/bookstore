<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LeaveRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     *
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'leave_type_id' => $this->leave_type_id,
            'leave_type' => $this->leaveType->name,
            'reason' => $this->reason,
            'days_requested' => $this->days_requested,
            'days_approved' => $this->days_approved,
            'employee_id' => $this->employee_id,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'status' => $this->status,
            'supervisor_id' => $this->supervisor_id,
            'employee' => $this->employee->name,
            'department' => $this->employee->department->name,
            'approver' => $this->approver->name,
            'date_requested' => Carbon::parse($this->created_at)->diffForHumans(),
            'startDate' => Carbon::parse($this->start_date)->format('D, M d Y'),
            'endDate' => Carbon::parse($this->end_date)->format('D, M d Y'),
            'hr_status' => $this->hr_status,
            'sup_approval' => $this->sup_approval,
            'hr_approval' => $this->hr_approval,
            'created_at' => Carbon::parse($this->created_at)->format('M d y'),
            'hr_id' => $this->hr_id,
            'approved_hr' => $this->approvedHr?->name,
            'moved_by' => $this->movedBy?->name,
            'moved' => $this->moved
        ];
    }
}
