<?php

namespace App\Http\Controllers\Admin\Excels;

use App\Http\Controllers\Controller;
use App\Imports\RecordImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use stdClass;
use Throwable;
use Toastr;

class ExcelController extends Controller
{
    public function index()
    {
        $data = Excel::toArray(new RecordImport, 'users.xlsx');
        dd($data);
        return view('admin.excel.list', [
            'title' => 'List account',
        ]);
    }

    public function upload(Request $request)
    {
        try {
            $data = Excel::toArray(new RecordImport, public_path('excel/source.xls'), null,
            \Maatwebsite\Excel\Excel::XLS);
            dd($data);
        } catch (Throwable $e) {
            dd($e);
            Toastr::error($e->getMessage(), 'Error');

            return redirect()->back();
        }
    }
}
