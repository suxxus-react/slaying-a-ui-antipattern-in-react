// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import daggy from 'daggy';

const RemoteData = daggy.taggedSum('RemoteData', {
 NotAsked:[],
 Loading: [],
 Failure: ['error'],
 Success: ['data'],
});

class Loader extends Component {
 state = { items: RemoteData.NotAsked };

 loadData = () => {
    const { fetch } = this.props;
    this.setState({items: RemoteData.Loading});

    const getItems = async () => {
        let response;
        try {
            response = await fetch();
            this.setState({items:RemoteData.Success(response)})
        }catch (err){
            this.setState({items:RemoteData.Failure(err)});
        }
     }

     getItems();
 };

 getView = (items = {}) => {
     const {
           renderNotAsked,
           renderLoading,
           renderError,
           renderSuccess
         } = this.props;
     return items.cata({
           NotAsked: () => renderNotAsked(),
           Loading: () => renderLoading(),
           Failure: error => renderError(error),
           Success: data => renderSuccess(data)
         });
   };

 render(){ 
    const { items } = this.state;
    const { children } = this.props;
    const View = this.getView(items);
    return children(View, this.loadData);
  }
}

export default Loader;
