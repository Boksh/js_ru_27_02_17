/**
 * Created by Boksh on 02.03.2017.
 */
import React, {Component} from 'react'

export default (props) => {
    const {comment} = props
    const style = {
        borderBottom: '1px solid gray',
        paddingBottom: '10px'
    };
    return (
        <div style={style}>
            <h5>{comment.user}</h5>
            <section>{comment.text}</section>
        </div>
    )
}


