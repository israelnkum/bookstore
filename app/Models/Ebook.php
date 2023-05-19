<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ebook extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'download_url',
        'size',
    ];

    /**
     * @return MorphOne
     */
    public function bookable(): MorphOne
    {
        return $this->morphOne(Book::class, 'bookable');
    }
}
