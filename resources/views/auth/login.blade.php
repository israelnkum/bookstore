@extends('layouts.login')
@section('content')
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="form-group row">
            <div class="col-md-12 mb-2">
                <div class="input-group">
                    <label for="username" class="sr-only">Email</label>
                    <input id="username" placeholder="Enter your email" type="text" class="form-control form-control-lg" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
                    <div class="invalid-feedback text-right mb-0">
                        Required
                    </div>
                </div>
            </div>

            <div class="col-md-12">
                <div class="input-group mb-2">
                    <label for="password" class="sr-only">password</label>
                    <input id="password"  placeholder="Enter your password" type="password" class="form-control form-control-lg" name="password" required autocomplete="current-password">
                    <div class="invalid-feedback text-right mb-0">
                        Required
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-md-6 col-lg-6 col-12 text-left">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                    <label class="custom-control-label" for="remember">{{ __('Remember Me') }}</label>
                </div>
            </div>
            <div class="col-md-6 col-lg-6 col-12 text-right">
                {{--@if (Route::has('password.request'))
                    <a class="text-primary" href="{{ route('password.request') }}">
                        {{ __('Forgot Password?') }}
                    </a>
                @endif--}}
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-12 mb-3">
                <button type="submit" class="btn btn-primary btn-lg btn-block">
                    {{ __('Login') }}
                </button>
            </div>
        </div>
        <div class="form-group row mb-0">
            <div class="col-md-12 mb-3">
                <p>Don't have account? <a href="/register" class="text-primary-800">Register Here</a></p>
            </div>
        </div>
    </form>
@endsection
