import React, { PropTypes } from 'react'

function Loader(props, context) {
    const loaderText = (context.lang === 'EN') ? 'Loading' : 'Загрузка'
    return (
        <h2>{loaderText}...</h2>
    )
}

Loader.contextTypes = {
    lang: PropTypes.string
}


export default Loader