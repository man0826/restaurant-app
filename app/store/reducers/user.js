import { ADD_CLIP, DELETE_CLIP } from "../actions/user";

const initialState = {
  clips: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLIP:
      return {
        ...state,
        clips: [...state.clips, action.clip],
      };
    case DELETE_CLIP:
      const newClips = state.clips.filter((clip) => clip.id !== action.clip.id);
      return {
        ...state,
        clips: newClips,
      };
    default:
      return state;
  }
};

export default userReducer;
