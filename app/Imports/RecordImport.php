<?php

namespace App\Imports;

namespace App\Imports;

use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class RecordImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            dd($row);
        }
    }
}
