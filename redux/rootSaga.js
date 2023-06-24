import { all, call } from "redux-saga/effects";
import eventsSagas from "./events/events.saga";

export default function* rootSaga() {
  yield all([call(eventsSagas)]);
}
