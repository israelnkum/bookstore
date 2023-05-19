<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaperBook extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'shipping_weight',
        'in_stock'
    ];

    /**
     * @return MorphOne
     */
    public function bookable(): MorphOne
    {
        return $this->morphOne(Book::class, 'bookable');
    }
}
