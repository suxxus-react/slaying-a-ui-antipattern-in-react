import React from 'react';

const fetch = () => 
   new Promise ((res, rej) => {
       res([
            { id: 1, name: 'foo' },
            { id: 2, name: 'bar' },
            { id: 3, name: 'baz' }
       ])
   });

const loaderProps = {
 fetch,
 renderNotAsked: () => (<div>Not Loaded Data</div>),
 renderLoading:() =>  (<div>...loading</div>),
 renderError: (err) => (<div>{ err }</div>),
 renderSuccess:(data = []) => (<div>{ data.map(item => (<p key={item.id} >{item.name}</p>)) }</div>),
};

export {
    fetch,
    loaderProps,
}
