
_.templateSettings.interpolate = /{([\s\S]+?)}/g;

mocha.setup({
    ui: "tdd",
    ignoreLeaks: true,
    asyncOnly: false
});

//--- your setup code goes here (i.e. create test instances of your Constructors)
//--- your setup code goes here


//--- your tests go here

// an example test suite
describe("Array", function(){
    describe("#indexOf()", function(){
        it("should return -1 when the value is not present", function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
})

//--- your tests go here

mocha.checkLeaks();
mocha.globals(["jQuery"]);
mocha.run();


