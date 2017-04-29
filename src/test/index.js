var chai,assert,expect,rules,sinon;

chai    = require("chai");
rules   = require("../rules");
sinon   = require("sinon");

assert  = chai.assert;
expect  = chai.expect;
rules   = rules.default;

describe('Rule', function()
{
    describe('accepted',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.accepted(true));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.accepted(false));
        });
    });

    describe('alpha',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.alpha('john'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.alpha('john doe'));
        });
    });

    describe('alpha_dash',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.alpha_dash('john-doe'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.alpha_dash('john_doe'));
        });
    });

    describe('alpha_num',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.alpha_num('john_doe99'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.alpha_num('john-doe'));
        });
    });

    describe('alpha_space',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.alpha_space('john doe'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.alpha_space('john-doe 99'));
        });
    });

    describe('required',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.required('1'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.required(null));
        });
    });

    describe('before',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.before('2017-02-15 01:05','2017-02-15 01:22'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.before('20130208T08','20130208T01'));
        });
    });

    describe('between',function()
    {
        //describe('file',function()
        //{
        //    it('should return false', function()
        //    {
        //        assert.equal(true, rules.between('','file',20,30));
        //    });
        //});

        describe('numeric',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.between(25,'numeric',20,30));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.between(15,'numeric',20,30));
            });
        });

        describe('string',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.between('A simple validator library','string',20,30));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.between('A simple validator library','string',40,80));
            });
        });

        describe('array',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.between([1,2,3,4,5,6],'array',3,6));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.between([1,2,3,4,5,6],'array',8,15));
            });
        });
    });

    describe('contains',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.contains([1,2,3,4],3,4));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.contains([1,2,3,4],7,8));
        });
    });

    describe('date',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.date('2013-02-08 09:30:26'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.date('2013-31-02'));
        });
    });

    describe('email',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.email('oluwafemialofe@yahoo.com'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.email('error.log'));
        });
    });

    describe('ip',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.ip('127.0.0.1'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.ip('0.0.0.0000'));
        });
    });

    //describe('max',function()
    //{
    //    it('should return true', function()
    //    {
    //        assert.equal(true, rules.max('value','string',5));
    //    });
    //
    //    it('should return false', function()
    //    {
    //        assert.equal(false, rules.max('values','string',5));
    //    });
    //});

    describe('number',function()
    {
        it('should return true (string)', function()
        {
            assert.equal(true, rules.numeric('21'));
        });

        it('should return true (number)', function()
        {
            assert.equal(true, rules.numeric(21));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.numeric('O'));
        });
    });

    describe('regex',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.regex('John-Doe','^[a-zA-Z\-]+$'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.regex('John Doe','^[a-zA-Z\-]+$'));
        });
    });

    describe('url',function()
    {
        it('should return true', function()
        {
            assert.equal(true, rules.url('http://www.foo.com/blah_blah'));
        });

        it('should return false', function()
        {
            assert.equal(false, rules.url('http://userid:password@example.com:8080'));
        });
    });

    describe('size',function()
    {
        describe('numeric',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.size(25,'numeric',25));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.size(15,'numeric',30));
            });
        });

        describe('string',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.size('A simple validator library','string',26));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.size('A simple validator library','string',2));
            });
        });

        describe('array',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.size([1,2,3,4,5,6],'array',6));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.size([1,2,3,4,5,6],'array',8));
            });
        });
    });

    describe('equal',function()
    {
        describe('array',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.equal([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.equal('[1, 2, 3, 4, 5, 6]', '[6, 5, 4, 3, 2, 1]'));
                assert.equal(false, rules.equal('[1, 2, 3, 4, 5, 6]', [6, 5, 4, 3, 2, 1]));
                assert.equal(false, rules.equal([1, 2, 3, 4, 5], [6, 5, 4, 3, 2]));
            });
        });

        describe('string',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.equal('true','true'));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.equal('true','false'));
            });
        });

        describe('number',function()
        {
            it('should return true', function()
            {
                assert.equal(true, rules.equal(16, 16));
            });

            it('should return false', function()
            {
                assert.equal(false, rules.equal(16, 21));
            });
        });
    });
});