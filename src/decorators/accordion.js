// Decorator for Accordion
import React from 'react'

export default (CustomComponent) => class AccordionComponent extends React.Component {

    state = {
        openItemId: null
    }

    toggleOpenItem = openItemId => ev => {
        //console.log(ev.target);
        ev.preventDefault()
        this.setState({
            openItemId
        })
    }

    isOpenItem = (itemId) => itemId === this.state.openItemId

    render() {
        return <CustomComponent {...this.props} isOpenItem = {this.isOpenItem} toggleOpenItem={this.toggleOpenItem} />
    }
}