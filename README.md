
# KEEP CALM AND BET TO WIN

This is a betting application with ethers.
With this application you can create teams and simple games rooms and make bets to the team you want. Once the game is over. The administrator selects the winner and closes the game. When the game closes, the accumulated pits are shared among the winners in proportion to their initial bet. The administrator keeps a commission of the game (this commission is editable according to the game).


## Requirements

Truffle v5.0.2 (core: 5.0.2)

Solidity v0.4.24 (solc-js)

Ganache CLI or GUI (test)

Conection to a private node (interact with dapp)

Node v10.15.0 +

```
    Game Managaker PK, just for privileges
```

## Use
* Point metamask to a private node that I raised (just for fun) the address of the node is: http://51.140.141.202:8545/

* Import the private key (it is the administrator account) to be able to have absolute control over the dapp. The Pk to import in metamask is: ```3D4A53A61CDCF5C8FAB640DB91F42A5A8E3E739EFD617F3B2CF1DDBA26E934B7```

* Download the solution
```
$ npm install
$ npm run start
```

* Run the unit test, placed in the folder with the solution
```
$ ganache-cli
$ truffle migrate --reset
$ truffle test
```

all tests must pass correctly

Why do I test in ganache and not in my private network? The truth is that I did not reach the time :(, but everything works OK

# Metamask guide

## Select Network
1. Press "Network Dropdown"

2. Select Custom RPC

3.  Insert the RPC URL and Click on "SAVE"
http://51.140.141.202:8545


## Import Metamask Accounts

1. Select "My Accounts Icon" and "Import Account"

2. In the import tab:
Select type "Private Key"
Paste the private key listed bellow
Click "Import Button"

