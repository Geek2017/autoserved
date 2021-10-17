@extends('layout.default')

@section('title', 'Home')

@push('css')
    <!-- extra css here -->
@endpush

@push('scripts')
    <!-- extra js here -->
@endpush

@section('content')
    <!-- BEGIN #content -->
    <div id="content" class="app-content">
        <ul class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">BREADCRUMB</a></li>
            <li class="breadcrumb-item active">HOME PAGE</li>
        </ul>

        <h1 class="page-header">
            Starter Page <small>page header description goes here...</small>
        </h1>

        <p>
            Start build your page here
        </p>
    </div>
    <!-- END #content -->
@endsection
