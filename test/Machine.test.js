const Machine = require('../src/Machine');

describe('Vending Machine', () => 
{
  describe('Stocking Items', () =>
  {
    it('is initialized with no items', () => 
    {
      // SEAT
      // setup
      const vendingMachine = new Machine();

      // exercise & assert
      expect(vendingMachine.seeSelections()).toEqual([]);

      // teardown, not needed
    });

    it('can stock one snack', () => 
    {
      // setup
      const vendingMachine = new Machine();
      const snack = {
        name: 'macadamia nuts',
        price: 250
      };

      // exercise
      vendingMachine.stock([snack]);

      // assert
      expect(vendingMachine.seeSelections()).toEqual([snack]);
    });
  });

  // someone attempts to stock without inventory
  // it('stocks nothing if there is no inventory passed', () => {
  //   // setup
  //   const vendingMachine = new Machine()

  //   // exercise
  //   vendingMachine.stock()

  //   // assertion
  //   expect(vendingMachine.seeSelections()).toEqual([])
  // })

  it('displays an error if no inventory comes with stocking', () => 
  {
    // setup
    const vendingMachine = new Machine();
    const displayMessage = "please do not troll. you cannot stock nothing.";

    // exercise & assert
    expect(() => vendingMachine.stock()).toThrow(displayMessage);
  })

  describe('Inserting Money', () => {
  
    it('displays how much money was inserted', () => 
    {
      const vendingMachine =  new Machine();
      const money = 100;
      expect(vendingMachine.deposit(money)).toEqual('You have deposited Rs 100');
    });
    
    it('only accepts bills in ["10", "20", "50", "100", "500"] amounts', () =>
    {
      const vendingMachine = new Machine();
      const money = 15;
      expect(() => vendingMachine.deposit(money)).toThrow('This machine only accepts ["10", "20", "50", "100", "500"] amounts');
    });

    it('contains a variable called depositedMoney', () =>
    {
      const vendingMachine = new Machine();
      expect(vendingMachine.depositedMoney).toBeDefined();
    });

    it('depositedMoney should be a int', () =>
    {
      const vendingMachine = new Machine();
      expect(typeof(vendingMachine.depositedMoney) === 'number');
    });

    it('adds additional money to existing credit', () => 
    {
      let vendingMachine = new Machine();
      vendingMachine.depositedMoney = 100;
      expect(vendingMachine.deposit(50)).toEqual('You have deposited Rs 150');
    });
  });

  describe('selecting item', () =>
  {
    it ('should not allow buying an unavailable item', () =>
    {
      let vendingMachine = new Machine();
      vendingMachine.itemList = 
      [
        {
          id: "E7", 
          item: 
          {
            name: "chips", 
            price: 250
          }, 
          amount: 0
        }
      ];

      const item = "E7";
      expect(vendingMachine.selectItem(item)).toEqual("The item you selected is unavailable");
    });

    it ('checks for insufficient funds for item', () =>
    {
      let vendingMachine = new Machine();
      vendingMachine.itemList = 
      [
        {
          id: "E7", 
          item: 
          {
            name: "chips", 
            price: 250
          }, 
          amount: 1
        }
      ];
      const item = "E7";

      const amtNeed = Math.abs(vendingMachine.itemList[0].item.price - vendingMachine.depositedMoney);
      expect(vendingMachine.selectItem(item)).toEqual(`You have insufficient funds. Please add Rs ${amtNeed}.`);
    });

    // it('returns correct change of item purchased', () =>
    // {
    //   let vendingMachine = new Machine();

    // })
  });
});
