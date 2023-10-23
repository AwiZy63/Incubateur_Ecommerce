import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavbarPanel() {
    const [currentLocation, setCurrentLocation] = useState('');

    const location = useLocation();

    useEffect(() => {
        setCurrentLocation(location.pathname.split('/')[2]);
        console.log(location.pathname.split('/')[2]);
    }, [location, location.pathname])


    return (
        <nav className='container'>
            <div className='columns mt-5'>
                <div className='column'>
                    <Link to='/panel/dashboard' className={`button ${currentLocation === 'dashboard' && 'is-primary'} is-medium is-fullwidth`}>
                        <i className="fas fa-home mr-2"></i> Tableau de bord
                    </Link>
                </div>
                <div className='column'>
                    <Link to='/panel/products' className={`button ${currentLocation === 'products' && 'is-primary'} is-medium is-fullwidth`}>
                        <i className="fas fa-box mr-2"></i> Produits
                    </Link>
                </div>
            </div>
            <div className='columns'>
                <div className='column'>
                    <Link to='/panel/users' className={`button ${currentLocation === 'users' && 'is-primary'} is-medium is-fullwidth`}>
                        <i className="fas fa-users mr-2"></i> Utilisateurs
                    </Link>
                </div>
                <div className='column'>
                    <Link to='/panel/sales' className={`button ${currentLocation === 'sales' && 'is-primary'} is-medium is-fullwidth`}>
                        <i className="fas fa-chart-line mr-2"></i> Ventes
                    </Link>
                </div>
            </div>
        </nav>
    )
}
