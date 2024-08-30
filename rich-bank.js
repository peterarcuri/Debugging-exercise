const accounts = [	{id: 1, owner: "Alice", balance: 500}, 	{id: 2, owner: "Bob", balance: 300}, {id: 3, owner: "Julie", balance: 1000} ];

function getAccountById(id)
{
	for (const account of accounts)
	{
		if (account.id === id) // added 3 equals for comparison
		{
			return account;
		}
	}
}	

function createAccount (newAccountId, newAccountOwner)
{
	const account = getAccountById(newAccountId);

	if (account) {
		throw new Error("Account already exists.");  // conditional to throw an error if Account already exists
	}
	if (!Number.isFinite(newAccountId) || newAccountId <= 0) {
		throw new Error("Invalid value for account ID. Account ID must be provided with a positivie finite integer."); // conditional will throw an error if number entered s not a valid, positive integer and the acount id is not less than or equal to zero
	}
	if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === "") {
		throw new Error("Invalid account owner: Account owner must be a non-empty string."); // conditional that throws an error if the string enter by user is not a string and trims excess space around the string
	}

	accounts.push(   // pushes new account information onto the array as a new Account 
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0
		}
	);
}

function depositMoney(accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found");
	}
	if (!Number.isFinite(amount) || amount <= 0) {
		throw new Error("Invalid deposit amount. Amount must be a positive, finite number.");  // conditional that throws an error if number is not a number and is less or equal to 0 (no negative integers)
	}
	account.balance += amount;
}

function withdrawMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found.");
	}

	if (!Number.isFinite(amount) || amount <= 0) // conditional (amount <= 0) added / will throw an error if less than or equal to 0 (no negative integers)
	{
		throw new Error("Invalid value for withdrawal amount: The amount must be a finite number.");
	}
	if (account.balance < amount) {
		throw new Error("Insufficient funds for withdrawal.");
	}

	account.balance -= amount;
}

function transferMoney (fromAccountId, toAccountId, amount)
{
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount)
	{
		throw new Error("Source account not found.");
	}
	if (!toAccount) {
		throw new Error("Destination account is not found."); // added conditional if the destination account was not found
	}

	if (!Number.isFinite(amount) || amount < 0)
	{
		throw new Error("Invalid value for transfer amount: The amount must be a positive finite number.");
	}
	if (fromAccount.balance < amount) {
		throw new Error("Insufficient funds to transfer."); // conditional will throw error if the source account's balance is insufficient
	}

	toAccount.balance += amount;
	fromAccount.balance += amount;
}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
