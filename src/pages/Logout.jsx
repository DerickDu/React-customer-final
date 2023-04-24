import React from 'react'

const Logout = () => {
    localStorage.setItem('login', false)
    localStorage.setItem('user', '')
    localStorage.setItem('user-detail', '')
    return (

        <div>Logout Successfully</div>
    )
}

export default Logout