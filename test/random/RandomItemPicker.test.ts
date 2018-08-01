let assert = require('chai').assert;

import { RandomItemPicker } from '../../src/random/RandomItemPicker';

suite('RandomItemPicker', ()=> {

    test('Pick', () => {
        let listEmpty = [];
    	let value = RandomItemPicker.pick(listEmpty);
    	assert.isTrue(value == null); 
    	
        let array: number[] = [1, 2];
    	value = RandomItemPicker.pick<number>(array);
    	assert.isTrue(value == 1 || value == 2); 
    	
        let list: number[] = [];
    	assert.isNull(RandomItemPicker.pick(list));
    	
        list = [1, 2];
    	value = RandomItemPicker.pick(array);
    	assert.isTrue(value == 1 || value == 2); 
   });

});
