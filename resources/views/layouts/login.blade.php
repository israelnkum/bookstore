<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Bookstore') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        button{
            border-radius: 10px !important;
            border: none !important;
        }

        input{
            background: none !important;
            font-size: 15px !important;
        }

        input:hover,
        input:active,
        input:focus
        {
            box-shadow: none !important;
            outline: 0 !important;
            background: none !important;
        }
        ::placeholder {
            font-family: Montserrat, sans-serif !important;
        }
        .login-body {
            border-radius: 10px;
        }
    </style>
    <link href="{{ asset('css/fontawesome.min.css') }}" rel="stylesheet">

</head>
<body style="background: #ffffff">
<div style="background-image: url({{asset('/images/landing-head.jpg')}}); background-size: cover; background-position: center center">
    <main class="">
        <div class="container-fluid">
            <div class="row justify-content-center align-items-center " style="height: 100vh">
                <div class="text-center position-absolute" style="top: 20px; right: 150px">
                    <a href="/landing" class="btn btn-outline-dark">Go to shop</a>
                </div>
                <div class="text-center position-absolute" style="top: 20px;">
                    @if(count($errors) > 0)
                        @foreach( $errors->all() as $message )
                            <div class="alert bg-danger text-white alert-dismissible">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <span>{{ $message }}</span>
                            </div>
                        @endforeach
                    @endif

                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                </div>
                <div class="col-md-4 text-center">
                    <div class="card login-body p-4 shadow-sm border-0">
                        <div>
                            <div class="">
                                <h4 class="title">BOOKSTORE</h4>
                            </div>
                            <div class="card-body">
                                @yield('content')
                            </div>
                            <div class="text-center">
                                <p>BOOKSTORE &copy; {{date('Y')}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</body>
</html>
