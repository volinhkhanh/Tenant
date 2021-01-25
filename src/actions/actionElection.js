import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest'
//---------------------------------------------------------------------------------------------------------------------
export const SET_REQUEST_LIST_ELECTION = 'SET_REQUEST_LIST_ELECTION'
export const SET_REQUEST_LIST_ELECTION_SUCCESS = 'SET_REQUEST_LIST_ELECTION_SUCCESS'
export const SET_REQUEST_LIST_ELECTION_ERROR = 'SET_REQUEST_LIST_ELECTION_ERROR'
//
export const SET_REQUEST_ELECTION_DETAIL_DATA = 'SET_REQUEST_ELECTION_DETAIL_DATA'
export const SET_REQUEST_ELECTION_DETAIL = 'SET_REQUEST_ELECTION_DETAIL'
export const SET_REQUEST_ELECTION_DETAIL_SUCCESS = 'SET_REQUEST_ELECTION_DETAIL_SUCCESS'
export const SET_REQUEST_ELECTION_DETAIL_ERROR = 'SET_REQUEST_ELECTION_DETAIL_ERROR'
//
export const SET_REQUEST_CANDIDATES_ELECTION_DETAIL = 'SET_REQUEST_CANDIDATES_ELECTION_DETAIL'
export const SET_REQUEST_CANDIDATES_ELECTION_DETAIL_SUCCESS = 'SET_REQUEST_CANDIDATES_ELECTION_DETAIL_SUCCESS'
export const SET_REQUEST_CANDIDATES_ELECTION_DETAIL_ERROR = 'SET_REQUEST_CANDIDATES_ELECTION_DETAIL_ERROR'
//
export const SET_REQUEST_VOTING_ELECTION_DETAIL = 'SET_REQUEST_VOTING_ELECTION_DETAIL'
export const SET_REQUEST_VOTING_ELECTION_SUCCESS = 'SET_REQUEST_VOTING_ELECTION_SUCCESS'
export const SET_REQUEST_VOTING_ELECTION_ERROR = 'SET_REQUEST_VOTING_ELECTION_ERROR'
//---------------------------------------------------------------------------------------------------------------------
export const setRequestListElection = () => ({type: SET_REQUEST_LIST_ELECTION})
export const setRequestListElectionSuccess = data => ({type: SET_REQUEST_LIST_ELECTION_SUCCESS, data})
export const setRequestListElectionError = data => ({type: SET_REQUEST_LIST_ELECTION_ERROR, data})
//
export const setElectionDetailData = data => ({type: SET_REQUEST_ELECTION_DETAIL_DATA, data})
export const setRequestElectionDetail = () => ({type: SET_REQUEST_ELECTION_DETAIL})
export const setRequestElectionDetailSuccess = data => ({type: SET_REQUEST_ELECTION_DETAIL_SUCCESS, data})
export const setRequestElectionDetailError = data => ({type: SET_REQUEST_ELECTION_DETAIL_ERROR, data})
//
export const setRequestCandidatesByElection = () => ({type: SET_REQUEST_CANDIDATES_ELECTION_DETAIL})
export const setRequestCandidatesByElectionSuccess = data => ({type: SET_REQUEST_CANDIDATES_ELECTION_DETAIL_SUCCESS, data})
export const setRequestCandidatesByElectionError = data => ({type: SET_REQUEST_CANDIDATES_ELECTION_DETAIL_ERROR, data})
//
export const setRequestVotingElection = () => ({type: SET_REQUEST_VOTING_ELECTION_DETAIL})
export const setRequestVotingElectionSuccess = data => ({type: SET_REQUEST_VOTING_ELECTION_SUCCESS, data})
export const setRequestVotingElectionError = data => ({type: SET_REQUEST_VOTING_ELECTION_ERROR, data})
//---------------------------------------------------------------------------------------------------------------------
export const getListElection = (params) => async (dispatch) => {
    dispatch(setRequestListElection())
    try {
        const response = await serviceRest.getListElection(params)
        if(response.status === 200) {
            dispatch(setRequestListElectionSuccess(response.data))
            return response.data
        } else {
            dispatch(setRequestListElectionError(response.problem))
            return false
        }
    } catch(error) {
        dispatch(setRequestListElectionError(error))
        return false
    }
}
//
export const getElectionDetail = (uuid) => async (dispatch) => {
    dispatch(setRequestElectionDetail())
    try {
        const response = await serviceRest.getElectionDetail(uuid)
        if(response.status === 200) {
            dispatch(setRequestElectionDetailSuccess(response.data))
            return response.data
        } else {
            dispatch(setRequestElectionDetailError(response.problem))
            return false
        }
    } catch(error) {
        dispatch(setRequestElectionDetailError(error))
        return false
    }
}
//
export const getCandidatesByElection = (uuid) => async (dispatch) => {
    dispatch(setRequestCandidatesByElection())
    try {
        const response = await serviceRest.getCandidatesByElection(uuid)
        if(response.status === 200) {
            dispatch(setRequestCandidatesByElectionSuccess(response.data))
            return response.data
        } else {
            dispatch(setRequestCandidatesByElectionError(response.problem))
            return false
        }
    } catch(error) {
        dispatch(setRequestCandidatesByElectionError(error))
        return false
    }
}
//
export const getVotingElection = (candidateId) => async (dispatch) => {
    dispatch(setRequestVotingElection())
    try {
        const response = await serviceRest.getVotingElection(candidateId)
        if(response.status === 200) {
            dispatch(setRequestVotingElectionSuccess(response.data))
            return true
        } else {
            dispatch(setRequestVotingElectionError(response.problem))
            Toast.show(response.data.message)
            return false
        }
    } catch(error) {
        dispatch(setRequestVotingElectionError(error))
        return false
    }
}