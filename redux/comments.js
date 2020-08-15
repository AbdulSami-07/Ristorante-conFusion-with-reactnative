import * as ActionTypes from './ActionTypes';

export const comments = (state = {
        isLoading : true,
        errMess : null,
        comments : []
    },action) => {
        switch(action.type){
            case ActionTypes.ADD_COMMENTS:
                return {...state,isLoading: false, errMess:null, comments: action.payload};

            case ActionTypes.COMMENTS_FAILED:
                return {...state,isLoading: false, errMess: action.payload, comments: []};
            
            case ActionTypes.ADD_COMMENT:
                let comment = {
                    id : state.comments.length,
                    dishId: action.payload.dishId,
                    rating: action.payload.rating,
                    comment: action.payload.comment,
                    author: action.payload.author,
                    date: action.payload.date,

                };
                return {...state, comments: state.comments.concat(comment)};

            default:
                return state;
        }
    } 
