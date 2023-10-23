import React from 'react'
import { Oval } from 'react-loader-spinner';

export default function LoadingScreen() {
    return (
        <Oval
            height={80}
            width={80}
            color="#00d1b2"
            wrapperStyle={{}}
            wrapperClass="loading-screen__spinner"
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#363636"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    )
}
