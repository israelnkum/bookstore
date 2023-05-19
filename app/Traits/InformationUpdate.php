<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;
use JsonException;

trait InformationUpdate
{

    /**
     * @param $newInfo
     * @param $oldInfo
     *
     * @return array
     * @throws JsonException
     */
    public function infoDifference($newInfo, $oldInfo): array
    {
        $newData = json_decode(json_encode($newInfo, JSON_THROW_ON_ERROR), true, 512, JSON_THROW_ON_ERROR);
        $oldData = json_decode(json_encode($oldInfo, JSON_THROW_ON_ERROR), true, 512, JSON_THROW_ON_ERROR);

        $difference = array_diff($newData, $oldData);

        $difference = array_diff($difference, ["null"]);
        unset($difference['_method']);

        return $difference;
    }
}