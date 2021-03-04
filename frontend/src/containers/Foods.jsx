import React, { Fragment, useEffect, useReducer } from "react";
import styled from "styled-components";
import { COLORS } from "../style_constants";
import { LocalMallIcon } from "./Icons";
import { FoodWrapper } from "../components/FoodWrapper";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";

// apis
import { fetchFoods } from "../apis/foods";
// reducers
import {
  initialState as foodsInitialState,
  foodsActionTyps,
  foodsReducer
} from "../reducers/foods";
// const
import { REQUEST_STATE } from "../constants";

// images
import MainLogo from "../images/logo.png";
import FoodImage from "../images/food-image.jpg";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

export const Foods = ({ match }) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  useEffect(() => {
    fetchFoods(match.params.restaurantsId).then(data =>
      dispatch({
        type: foodsActionTyps.FETCH_SUCCESS,
        payload: {
          foods: data.foods
        }
      })
    );
  }, []);

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
      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            {[...Array(12).keys()].map(i => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </Fragment>
        ) : (
          foodsState.foodsList.map(food => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={food => console.log(food)}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
    </Fragment>
  );
};
