import React, {Component} from 'react';

const updateItemDetails = (View, itemId, getData, getImageUrl) => {
    return class extends Component {
        state = {
            item: null,
            image: null
        };

        componentDidMount() {
            this.updateItem();
        }

        componentDidUpdate(prevProps) {
            if (this.props.itemId !== prevProps.itemId) {
                this.updateItem();
            }
        }

        updateItem() {
            if (!itemId) {
                return;
            }

            getData(itemId)
                .then((item) => {
                    this.setState({
                        item,
                        image: getImageUrl(item)
                    });
                });
        }

        render() {
            const {item, image} = this.state;
            if (!item) {
                return <span>Select a item from a list</span>;
            }

            return <View {...this.props} item={item} image={image} />

        }
    }
}

export default updateItemDetails;