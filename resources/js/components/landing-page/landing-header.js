import React from 'react'
import LoginRegister from "./login-register";

function LandingHeader() {

    return (
        <div className={'landing-head w-full items-center'}>
            <div className={'pl-[250px] pt-5'}>
                <LoginRegister/>
            </div>
            <div className={'flex flex-wrap items-center h-screen'}>
                <div className={'pl-[250px]'}>
                    <h1 className={'text-6xl w-[500px]'}>By and sell your textbooks for the best price</h1>
                </div>
            </div>
        </div>
    )
}

export default LandingHeader
