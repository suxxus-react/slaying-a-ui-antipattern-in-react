import React from 'react';
import ReactDOM from 'react-dom';
import daggy from 'daggy';
import { shallow } from 'enzyme';

import  Loader  from './Loader';
import renderer from 'react-test-renderer';

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });

const $ = renderer.create;

const RemoteData = daggy.taggedSum('RemoteData', {
 NotAsked:[],
 Loading: [],
 Failure: ['error'],
 Success: ['data'],
});

const fetch = () => 
   new Promise ((res, rej) => {
       res([
            { id: 1, name: 'foo' },
            { id: 2, name: 'bar' },
            { id: 3, name: 'baz' }
       ])
   });

const props = {
 fetch,
 renderNotAsked: () => (<div>Not Loaded Data</div>),
 renderLoading:() =>  (<div>...loading</div>),
 renderError: (err) => (<div>{ err }</div>),
 renderSuccess:(data = []) => (<div>{ data.map(item => (<p key={item.id} >{item.name}</p>)) }</div>),
};

describe('Loader', ()=> {
    it('render not asked', () => {
        const tree = $(
            <Loader {...props}>
            {
                (view, LoadData) => (
                   <div>  
                    {view}
                    <button>Load data</button>
                   </div>
                )
            }
            </Loader>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('render loading data', () => {
        const wrapper = shallow(
            <Loader {...props}>
            {
                (view, LoadData) => (
                   <div>  
                    {view}
                    <button>Load data</button>
                   </div>
                )
            }
            </Loader>
        );

        wrapper.setState({items: RemoteData.Loading});
        expect(wrapper).toMatchSnapshot();
    });
    
    it('render data loaded', () => {
        const wrapper = shallow(
            <Loader {...props}>
            {
                (view, LoadData) => (
                   <div>  
                    {view}
                    <button>Load data</button>
                   </div>
                )
            }
            </Loader>
        );

        wrapper.setState({items: RemoteData.Success([{id:2, name:''}])});
        expect(wrapper).toMatchSnapshot();
    });

    it('data loading fail', () => {
        const wrapper = shallow(
            <Loader {...props}>
            {
                (view, LoadData) => (
                   <div>  
                    {view}
                    <button>Load data</button>
                   </div>
                )
            }
            </Loader>
        );

        wrapper.setState({items: RemoteData.Failure('error')});
        expect(wrapper).toMatchSnapshot();
    });
});

