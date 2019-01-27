# Avoiding Common Attacks
```
A summary of precautions implemented to mitigate the risk of common attack patterns on smart contracts.
```

# Integer Overflow
```
The GameManager contract utilizes Open Zeppelin's SafeMath contract for all uint256 calculations in order to guard against integer overflow attacks.
```

# TX.origin Problem
```
The GameManager contract is responsible for instantiating instances of Matchs and Teams contract. As such, it needs to pass the address of the original caller to the constructor of the Store contract. I made sure to use msg.sender, and not tx.origin in order to avoid the unreliable tx.origin.
```

# Poison Data
```
The 3 contracts accepts differente types of inputs. To prevent poison data, the places that accept  inputs include the correct validation to mitigate this problem.
```

# Privileges
```
As only one administrator is the one that has control over the gameManager, I have created a modifier that is in charge of validating that the owner is the correct one, in this case the one that made the deploy of the GameManager contract
```

