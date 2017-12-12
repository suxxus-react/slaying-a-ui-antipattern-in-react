import React from 'react';
import Loader from './Loader';

const fetch = () => 
   new Promise ((res, rej) => {
       setTimeout(() => {
         res([
              { id: 1, name: 'foo' },
              { id: 2, name: 'bar' },
              { id: 3, name: 'baz' }
            ])
        },2000);
   });

const loaderProps = {
 fetch,
 renderNotAsked: () => (<div>Not Loaded Data</div>),
 renderLoading:() =>  (<div>...loading</div>),
 renderError: (err) => (<div>{ err }</div>),
 renderSuccess:(data = []) => 
    (<ul>{ data.map((item = {}) => (<li key={item.id}>{item.name}</li>)) }</ul>),
};

const App = () =>(
      <div>
        <Loader {...loaderProps}>
            {
                (view, LoadData) => (
                   <div>  
                    {view}
                    <button onClick={LoadData} >Load data</button>
                   </div>
                )
            }
         </Loader>
       </div>);

export default App;
