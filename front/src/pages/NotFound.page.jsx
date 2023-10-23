import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { notify } from '../App';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        notify("error", "Cette page n'existe pas");
        navigate('/', { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>NotFound</div>
    )
}
