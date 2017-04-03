import React, { PropTypes } from 'react'

function Loader(props, context) {
    const loaderText = (context.lang === 'EN') ? 'Loading' : 'Загрузка'
    return (
        <h2>{loaderText}...</h2>
    )
}

Loader.contextTypes = {
//тут и в других местах: лучше сделай декоратор либо компонент-обертку для локализации, чтоб не обращатся каждый раз к контексту, иначе потом тяжело будет что-либо поменять
    lang: PropTypes.string
}


export default Loader
