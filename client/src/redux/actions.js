export const SET_USER = 'SET_USER';

export function setUser(data) {
    return {
        type: SET_USER,
        data,
    }
}

export const SET_TEAM = 'SET_TEAM';

export function setTeam(TeamId) {
    return {
        type: SET_TEAM,
        TeamId,
    }
}

export const TOGGLE_THEME = 'TOGGLE_THEME';

export function toggleTheme() {
    return {
        type: TOGGLE_THEME,
        
    }
}
