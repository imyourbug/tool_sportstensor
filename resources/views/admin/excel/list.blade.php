@extends('admin.main')
@push('styles')
@endpush
@push('scripts')
@endpush
@section('content')
    <form action="{{ route('admin.excels.upload') }}" method="post" enctype="multipart/form-data">
        @csrf
        <div class="form-group">
            <label for="">File source</label>
            <input type="file" name="file" />
        </div>
        <button class="btn btn-success">Upload</button>
    </form>
@endsection
