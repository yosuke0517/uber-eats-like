import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { COLORS } from '../style_constants';
import { LocalMallIcon } from './Icons';
import { Link } from "react-router-dom";

// apis
import { fetchFoods } from '../apis/foods';
// reducers
import {initialState as foodsInitialState, foodsActionTyps, foodsReducer } from '../reducers/foods'
// const
import { REQUEST_STATE } from '../constants';
import MainLogo from "../images/logo.png";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

export const Foods = ({match}) => {

    const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

    useEffect(() => {
        fetchFoods(match.params.restaurantsId)
            .then((data) =>
                dispatch({
                    type: foodsActionTyps.FETCH_SUCCESS,
                    payload: {
                        foods: data.foods
                    }
                })
            )
    }, [])

    return (
        <Fragment>
            <HeaderWrapper>
                <Link to="/restaurants">
                    <MainLogoImage src={MainLogo} alt="main logo" />
                </Link>
                <BagIconWrapper>
                    <Link to="/orders">
                        <ColoredBagIcon fontSize="large" />
                    </Link>
                </BagIconWrapper>
            </HeaderWrapper>
                {
                    foodsState.fetchState === REQUEST_STATE.LOADING ?
                        <Fragment>
                            <p>
                                ロード中...
                            </p>
                        </Fragment>
                        :
                        foodsState.foodsList.map(food =>
                            <div key={food.id}>
                                {food.name}
                            </div>
                        )
                }
        </Fragment>
    )
}