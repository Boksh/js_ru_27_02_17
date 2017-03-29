export default store => next => action => {
    console.log('---', 'before: ', store.getState().comments.toJS())
    console.log('---', 'action: ', action)
    next(action)
    console.log('---', 'after:', store.getState().comments.toJS())
//    next({...action, newField: 'some'})
}