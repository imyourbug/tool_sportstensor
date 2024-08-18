<?php

use App\Http\Controllers\Users\TaskController;
use App\Http\Controllers\Users\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', function() {
    return redirect()->route('admin.excels.index');
});

#admin
Route::group(['prefix' => '/admin', 'namespace' => 'App\Http\Controllers\Admin', 'as' => 'admin.'], function () {
    Route::get('/', 'AdminController@index')->name('index');
    #excels
    Route::group(['prefix' => 'excels', 'namespace' => 'Excels', 'as' => 'excels.'], function () {
        Route::get('/', 'ExcelController@index')->name('index');
        Route::post('/upload', 'ExcelController@upload')->name('upload');
    });
});
