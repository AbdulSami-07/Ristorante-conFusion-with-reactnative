import * as ActionTypes from './ActionTypes';
import  { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments' )
                .then(response =>{
                    if(response.ok){
                        return response;
                    }
                    else{
                        //server error
                        let error = new Error("Error: " + response.status + ": " + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },error => { //in app error
                    let  errMess = new Error(error.message);
                    throw errMess;
                })
                .then(response => response.json())
                .then(comments => dispatch(addComments(comments)))
                .catch(error => dispatch(commentsFailed(error.message)));
}

export const addComments = (comments) => {
    return ({
        type: ActionTypes.ADD_COMMENTS,
        payload: comments
    });
}

export const commentsFailed = (errMess) => {
    return({
        type: ActionTypes.COMMENTS_FAILED,
        payload: errMess
    });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());
    return fetch(baseUrl + 'dishes' )
                .then(response =>{
                    if(response.ok){
                        return response;
                    }
                    else{
                        //server error
                        let error = new Error("Error: " + response.status + ": " + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },error => { //in app error
                    let  errMess = new Error(error.message);
                    throw errMess;
                })
                .then(response => response.json())
                .then(dishes => dispatch(addDishes(dishes)))
                .catch(error => dispatch(dishesFailed(error.message)));
}

export const addDishes= (dishes) => {
    return ({
        type: ActionTypes.ADD_DISHES,
        payload: dishes
    });
}

export const dishesFailed = (errMess) => {
    return({
        type: ActionTypes.DISHES_FAILED,
        payload: errMess
    });
}

export const dishesLoading = () => {
    return ({
        type: ActionTypes.DISHES_LOADING
    });
}

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
    return fetch(baseUrl + 'promotions' )
                .then(response =>{
                    if(response.ok){
                        return response;
                    }
                    else{
                        //server error
                        let error = new Error("Error: " + response.status + ": " + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },error => { //in app error
                    let  errMess = new Error(error.message);
                    throw errMess;
                })
                .then(response => response.json())
                .then(promotions => dispatch(addPromos(promotions)))
                .catch(error => dispatch(PromosFailed(error.message)));
}

export const addPromos = (promotions) => {
    return ({
        type: ActionTypes.ADD_PROMOS,
        payload: promotions
    });
}

export const PromosFailed = (errMess) => {
    return({
        type: ActionTypes.PROMOS_FAILED,
        payload: errMess
    });
}

export const promosLoading = () => {
    return ({
        type: ActionTypes.PROMOS_LOADING
    });
}

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());
    return fetch(baseUrl + 'leaders' )
                .then(response =>{
                    if(response.ok){
                        return response;
                    }
                    else{
                        //server error
                        let error = new Error("Error: " + response.status + ": " + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },error => { //in app error
                    let  errMess = new Error(error.message);
                    throw errMess;
                })
                .then(response => response.json())
                .then(leaders => dispatch(addLeaders(leaders)))
                .catch(error => dispatch(leadersFailed(error.message)));
}

export const addLeaders = (leaders) => {
    return ({
        type: ActionTypes.ADD_LEADERS,
        payload: leaders
    });
}

export const leadersFailed = (errMess) => {
    return({
        type: ActionTypes.LEADERS_FAILED,
        payload: errMess
    });
}

export const leadersLoading = () => {
    return ({
        type: ActionTypes.LEADERS_LOADING
    });
}

export const postFavorite = (dishId) => (dispatch) =>{
    setTimeout( ()=>{
        dispatch(addFavorite(dishId));
    },2000);

}

export const addFavorite =(dishId) =>({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const postComment = (dishId,rating,author,comment) => (dispatch) => {
    const newComment = {
        dishId : dishId,
        rating: rating,
        author: author,
        comment: comment,
        date: new Date().toISOString()
    };
    return fetch(baseUrl + 'comments',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment),
        credentials: 'same-origin'
    })
    .then(response =>{
        if(response.ok){
            return response;
        }
        else{
            //server error
            let error = new Error("Error: " + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
        }
    },error => { //in app error
        let  errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then( response => dispatch(addComment(response)))
    .catch(error =>{
        console.log(error);
    });

}

export const addComment = (comment) => {
    return ({
        type: ActionTypes.ADD_COMMENT,
        payload: comment
    });
}

export const deleteFavorite = (dishId) => {
    return ({
        type: ActionTypes.DELETE_FAVORITE,
        payload: dishId
    });
}