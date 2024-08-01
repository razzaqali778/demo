import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white py-6 shadow-md">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">STOCK VIEWER</h1>
        <p className="text-lg mt-2 opacity-80">
          Your gateway to financial markets
        </p>
      </div>
    </header>
  )
}

export default Header
