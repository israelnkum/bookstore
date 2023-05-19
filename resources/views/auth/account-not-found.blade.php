@extends('layouts.login')
@section('content')
    <div class="card border-none">
        <div class="card-body py-3">
            <h1 class="font-bold text-uppercase text-danger">Account Not found</h1>
            <br>
            <p>Contact
                <span class="text-danger">Directorate of H.R</span> <br>
                for your <span class="text-danger">STAFF EMAIL</span> to be linked
            </p>

            <br>
            <a href="{{ url('auth/google/redirect') }}" class="text-decoration-none">
                <button type="button" class="btn btn-light btn-lg btn-block border">
                    <img width="20" src="{{asset('assets/img/google.svg')}}" class="mr-2" alt="icon">
                    {{ __('Login with Google') }}
                </button>
            </a>
        </div>
    </div>
@endsection
