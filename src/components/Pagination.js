import React, { PropTypes } from 'react';
import {NavLink} from 'react-router-dom'

function Pagination(props) {
    const { totalPage, limit, path, clickFunc } = props
    let pList = []
    let i = 0

    while (i*limit < totalPage) {
        pList.push(<NavLink onClick={clickFunc(i)} key={i} to={`${path}/${i+1}`} activeClassName="active">{i+1}</NavLink>)
        i++
    }

    return (
        <div>
            <h2>Пигинация</h2>
            <ul>
                {pList}
            </ul>
        </div>
    );
}

Pagination.propTypes = {};
Pagination.defaultProps = {};

export default Pagination;
