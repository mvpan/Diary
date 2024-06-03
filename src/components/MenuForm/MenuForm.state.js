export const INITIAL_STATE = {
  isValid: { post: true, title: true, date: true },
  values: { post: "", title: "", date: "", tag: "" },
  isFormReadyToSubmit: false
};
export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, values: { ...state.values, ...action.payload } };
    case "CLEAR":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormReadyToSubmit: false
      };
    case "RESET_VALID":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const titleValid = state.values.title.trim().length;
      const postValid = state.values.post.trim().length;
      const dateValid = state.values.date;

      return {
        ...state,
        isValid: { title: titleValid, post: postValid, date: dateValid },
        isFormReadyToSubmit: titleValid && postValid && dateValid
      };
    }
  }
}
