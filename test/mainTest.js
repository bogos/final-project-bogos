const GameManager = artifacts.require("./GameManager.sol");
const Match = artifacts.require("./Match.sol");
const Team = artifacts.require("./Team.sol");

contract("GameManager", accounts => {

  it("...should create a Team", async () => {
    const GameManagerInstance = await GameManager.deployed();

    // Create Teams
    await GameManagerInstance.createTeam("TeamA", { from: accounts[0] });
    await GameManagerInstance.createTeam("TeamB", { from: accounts[0] });

    // Get stored value
    const teamsData = await GameManagerInstance.getTeamAddresses.call();

    // Get Teams Names
    const teamsName_1 = await GameManagerInstance.teamsNames(teamsData[0], {from:accounts[0]});
    const teamsName_2 = await GameManagerInstance.teamsNames(teamsData[1], {from:accounts[0]});

    assert.equal(teamsName_1, "TeamA", "The value was not stored.");
    assert.equal(teamsName_2, "TeamB", "The value was not stored.");
  });

  it("...should create a Match", async () => {
    const GameManagerInstance = await GameManager.deployed();

    const teamsData = await GameManagerInstance.getTeamAddresses.call();

    // Create Match
    await GameManagerInstance.createMatch(teamsData[0], teamsData[1], 1000);

    const matchData = await GameManagerInstance.getAllMatches.call();

    assert.equal(matchData.length, 1, "The match was not created");
  })


  it("...teams should be assigned", async() => {

    const GameManagerInstace = await GameManager.deployed();
    const teamsData = await GameManagerInstace.getTeamAddresses.call();

    const teamInstance_1 = new web3.eth.Contract(Team.abi, teamsData[0]);
    const teamInstance_2 = new web3.eth.Contract(Team.abi, teamsData[1]);

    currentMatch_1 = await teamInstance_1.methods.currentMatch().call();
    currentMatch_2 = await teamInstance_2.methods.currentMatch().call();

    console.log(currentMatch_1, currentMatch_2);
    assert.equal(currentMatch_1, currentMatch_2, "The teams are not assigned to the same match")
  })

  it("...should make a bet", async () => {
    const GameManagerInstance = await GameManager.deployed();

    const teamsData = await GameManagerInstance.getTeamAddresses.call();
    const matchData = await GameManagerInstance.getAllMatches.call();

    const teamInstance_1 = new web3.eth.Contract(Team.abi, teamsData[0]);
    currentMatch_1 = await teamInstance_1.methods.currentMatch().call();

    console.log("MatchData", matchData);
    console.log("currentMatch_1", currentMatch_1);
    console.log("TeamData", teamsData);
  
    const MatchInstance = new web3.eth.Contract(Match.abi, matchData[0]);  

    await web3.eth.sendTransaction({from: accounts[0], to: teamsData[0], value: web3.utils.toWei("5"), gas: 210000});

    const matchInfo = await MatchInstance.methods.getMatch().call();

    assert.equal(web3.utils.fromWei(matchInfo['_poolTeam1']), 5, "The bet is not the same :S!!");
  })

  it("...should refund eth when a match is cancelled", async () =>{

    const GameManagerInstace = await GameManager.deployed();

    let matchData = await GameManagerInstace.getAllMatches.call();

    
    let eth_before = web3.utils.fromWei((await web3.eth.getBalance(accounts[0])).toString());
    console.log("ETH before bet: ", eth_before);

    // 3 Draw, 4 Cancel
    await GameManagerInstace.finishMatch(matchData[0], 4, {from:accounts[0]});

    let eth_after = web3.utils.fromWei((await web3.eth.getBalance(accounts[0])).toString());
    console.log("ETH before bet: ", eth_after);

    console.log("ETH after bet: ", web3.utils.fromWei((await web3.eth.getBalance(accounts[0])).toString()));
  
  })
});

