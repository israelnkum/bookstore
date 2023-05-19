<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category_id' => $this->category_id,
            'author_id' => $this->author_id,
            'author' => $this->author->name,
            'category' => $this->category->name,
            'bookable' => $this->bookable,
            'book_type' => $this->bookable_type,
            'isbn' => $this->isbn,
            'description' => $this->description,
            'price' => $this->price,
            'photo' => '/storage/images/books/' . ($this->photo ? $this->photo->file_name : 'default.jpg'),
        ];
    }
}
