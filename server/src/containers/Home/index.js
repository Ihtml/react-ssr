import React from 'react'
import Header from '../../components/Header'
const Home = () => {
    return (
        <div>
            <Header />
            <div>this is new Home component</div>
            <button onClick={()=>{alert('clicked!')}}>
                click
            </button>
        </div>
    )
}

export default Home
