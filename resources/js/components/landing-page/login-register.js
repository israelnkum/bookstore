import React from 'react'

function LoginRegister() {

    return (
        <div className={'flex gap-2'}>
            <a href="/login" className={'auth-btn'}>Login</a>
            <a href="/register" className={'auth-btn'}>Register</a>
        </div>
    )
}

export default LoginRegister
