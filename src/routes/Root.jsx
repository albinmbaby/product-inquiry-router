import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Root = () => {
  return (
    <div>
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About Us</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                    
                </ul>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            @Albin 2024 My Website
        </footer>
    </div>

  )
}

export default Root