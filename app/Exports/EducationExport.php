<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EducationExport implements FromCollection, WithMapping, WithHeadings, ShouldAutoSize
{

    private AnonymousResourceCollection $collection;

    public function __construct($collection)
    {
        $this->collection = $collection;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function collection(): AnonymousResourceCollection
    {
        return $this->collection;
    }

    public function headings(): array
    {
        return [
            'Education Level',
            'Institution',
            'Qualification',
            'Date'
        ];
    }

    public function map($row): array
    {
        return [
            $row->employee->name,
            $row->educationLevel->name,
            $row->institution,
            $row->qualification,
            $row->date
        ];
    }
}
