import * as types from '../actions/actionElection'

const initialState = {
    //-------------------------------------------------------------------
    getListElectionProgress: false,
    getElectionDetailProgress: false,
    getCandidatesByElectionProgress: false,
    getVotingElectionProgress: false,
    //-------------------------------------------------------------------
    getListElectionData: null,
    getElectionDetailData: null,
    getCandidatesByElectionData: null,
    getVotingElectionData: null,
    //-------------------------------------------------------------------
}
//
const reducerElection = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_REQUEST_LIST_ELECTION: {
            return {
                ...state,
                getListElectionProgress: true,
            }
        }
        case types.SET_REQUEST_LIST_ELECTION_SUCCESS: {
            return {
                ...state,
                getListElectionProgress: false,
                getListElectionData: action.data,
            }
        }
        case types.SET_REQUEST_LIST_ELECTION_ERROR: {
            return {
                ...state,
                getListElectionProgress: false,
            }
        }
        //
        case types.SET_REQUEST_ELECTION_DETAIL_DATA: {
            return {
                ...state,
                getElectionDetailData: action.data,
            }
        }
        case types.SET_REQUEST_ELECTION_DETAIL: {
            return {
                ...state,
                getElectionDetailProgress: true,
            }
        }
        case types.SET_REQUEST_ELECTION_DETAIL_SUCCESS: {
            return {
                ...state,
                getElectionDetailProgress: false,
                getElectionDetailData: action.data,
            }
        }
        case types.SET_REQUEST_ELECTION_DETAIL_ERROR: {
            return {
                ...state,
                getElectionDetailProgress: false,
            }
        }
        //
        case types.SET_REQUEST_CANDIDATES_ELECTION_DETAIL: {
            return {
                ...state,
                getCandidatesByElectionProgress: true,
            }
        }
        case types.SET_REQUEST_CANDIDATES_ELECTION_DETAIL_SUCCESS: {
            return {
                ...state,
                getCandidatesByElectionProgress: false,
                getCandidatesByElectionData: action.data,
            }
        }
        case types.SET_REQUEST_CANDIDATES_ELECTION_DETAIL_ERROR: {
            return {
                ...state,
                getCandidatesByElectionProgress: false,
            }
        }
        //
        case types.SET_REQUEST_VOTING_ELECTION_DETAIL: {
            return {
                ...state,
                getVotingElectionProgress: true,
            }
        }
        case types.SET_REQUEST_VOTING_ELECTION_SUCCESS: {
            return {
                ...state,
                getVotingElectionProgress: false,
                getVotingElectionData: action.data,
            }
        }
        case types.SET_REQUEST_VOTING_ELECTION_ERROR: {
            return {
                ...state,
                getVotingElectionProgress: false,
            }
        }
        default: 
            return state
    }
}

export default reducerElection