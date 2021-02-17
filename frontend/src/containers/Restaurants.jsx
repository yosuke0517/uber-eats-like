import React, { Fragment, useEffect } from 'react';

import { fetchRestaurants } from '../apis/restaurants';

export const Restaurants = () => {

    useEffect(() => {
        fetchRestaurants().then(r => console.log(r))
    }, [])
    return (
        <Fragment>
            レストラン一覧
        </Fragment>
    )
}
