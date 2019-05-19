import React from 'react';
import renderer from 'react-test-renderer';
import Home from './../Home';
describe(">>> Home Dumb Component test more of unit testing",()=>{
    const _getComponent = (props) => {
    return shallow(<Home/>);
    };

    test("+++ snapshot test",()=>{
        expect( _getComponent({}) ).toMatchSnapshot();
    })

    test("+++ intial state test",()=>{
        const instance = _getComponent({}).state();
        expect(instance.amount).toBe(0);
        expect(instance.isUpiSelected).toBe(false);
    })  

    test('+++ entered amount 100 test', () => {
        const instance = _getComponent().instance();
        
        instance.onAmoutChange(100)
        expect( instance.state.amount).toBe(100);
        expect( instance ).toMatchSnapshot(); 

        instance.onAmoutChange("")
        expect( instance.state.amount).toBe(0);
        expect( instance ).toMatchSnapshot(); 

    });

    test('+++ select Upi test', () => {
        const instance = _getComponent().instance();
        
        instance.selectUpi(true)
        expect( instance.state.isUpiSelected).toBe(true);
        expect( instance ).toMatchSnapshot(); 

        instance.selectUpi(false)
        expect( instance.state.isUpiSelected).toBe(false);
        expect( instance ).toMatchSnapshot(); 
    });
 
    
    test('+++ press Pay Bill Buttom test', () => {
        const instance = _getComponent().instance();
        instance.payBill();
        expect( instance ).toMatchSnapshot(); 
    });

});

