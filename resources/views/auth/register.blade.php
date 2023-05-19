@extends('layouts.login')
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="form-group row">
                        <input placeholder="{{ __('Name') }}" id="name" type="text" class="form-control @error('name') is-invalid @enderror"
                               name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                        @error('name')
                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
                    </div>

                    <div class="form-group row">

                        <input id="email" placeholder="{{ __('E-Mail Address') }}" type="email" class="form-control @error('email') is-invalid @enderror"
                               name="email" value="{{ old('email') }}" required autocomplete="email">

                        @error('email')
                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
                    </div>

                    <div class="form-group row">
                        <input id="password" type="password" placeholder="{{ __('Password') }}"
                               class="form-control @error('password') is-invalid @enderror" name="password" required
                               autocomplete="new-password">

                        @error('password')
                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                        @enderror
                    </div>

                    <div class="form-group row">
                        <input id="password-confirm" placeholder="{{ __('Confirm Password') }}" type="password" class="form-control"
                               name="password_confirmation" required autocomplete="new-password">

                    </div>

                    <div class="form-group row mb-2">
                        <button type="submit" class="btn btn-primary btn-block btn-lg">
                            {{ __('Register') }}
                        </button>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-md-12 mb-3">
                            <p>Already have account? <a href="/login" class="text-primary-800">Login Here</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
